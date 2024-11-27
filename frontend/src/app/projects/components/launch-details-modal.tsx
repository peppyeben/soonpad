import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import xcv from "@/assets/soonpadx.png";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { PROGRAM_ID } from "@/app/create/components/create-token-launch-page";
import { HelloAnchor } from "@/types/HelloAnchor";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import soonpad_idl from "@/utils/soonpad.json";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

interface LaunchDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    launch: any; // Consider creating a proper type for your launch object
}

export function LaunchDetailsModal({ isOpen, onClose, launch }: LaunchDetailsModalProps) {
    const [program, setProgram] = useState<Program<HelloAnchor> | null>(null);

    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [launchMintAddress, setLaunchMintAddress] = useState<string | null>(null);

    const provider = useMemo(() => {
        if (!wallet) return null;
        return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    }, [connection, wallet]);

    useEffect(() => {
        if (provider) {
            const program = new Program(soonpad_idl as HelloAnchor, PROGRAM_ID, provider as any);
            setProgram(program);
        }
    }, [provider]);
    const [joinSaleAmount, setJoinSaleAmount] = useState<number | null>(null);

    useEffect(() => {
        getMintAccount();
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const sanitizedValue = value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/^(\d+\.?\d{0,4}).*/, "$1");

        e.target.value = sanitizedValue;

        setJoinSaleAmount(sanitizedValue ? parseFloat(sanitizedValue) : null);
    };

    async function getMintAccount() {
        const [mintAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("mint"), new PublicKey(launch.token_launch_address).toBuffer()],
            PROGRAM_ID
        );

        setLaunchMintAddress(mintAccountPDA.toBase58());
    }

    async function joinSale() {
        if (joinSaleAmount == null) {
            console.log("Join Amount is empty");
            return;
        }

        if (!wallet) {
            console.log("No wallet found");
            return;
        }

        console.log(launch);

        const [creatorAccountPDA, creatorAccountBump] = PublicKey.findProgramAddressSync(
            [Buffer.from("useraccount"), new PublicKey(launch.creator_pubkey).toBuffer()],
            PROGRAM_ID
        );
        const fetchCreatorAccount = await program?.account.userAccount.fetch(creatorAccountPDA);

        const noOfTokenlaunches = fetchCreatorAccount?.noOfTokenLaunches.toNumber();

        let idToUse;

        for (let seed = 0; seed < noOfTokenlaunches; seed++) {
            const userTokenLaunchBytes = new ArrayBuffer(8);
            const dataView = new DataView(userTokenLaunchBytes);

            dataView.setBigUint64(0, BigInt(seed), true); // true for little-endian

            const [tokenLaunchpadAccountPDA] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("tokenlaunchpad"),
                    wallet.publicKey.toBuffer(),
                    Buffer.from(new Uint8Array(userTokenLaunchBytes)),
                ],
                PROGRAM_ID
            );

            console.log(tokenLaunchpadAccountPDA.toBase58());
            console.log(
                String(tokenLaunchpadAccountPDA.toBase58()) === launch.token_launch_address
            );
            console.log(seed);

            if (tokenLaunchpadAccountPDA.toBase58() === launch.token_launch_address) {
                idToUse = seed;
                // console.log("Found seed:", seed);
                // return; // Return the matching seed
            }
        }
        const [contributorAccountPDA] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("contribution"),
                new PublicKey(launch.token_launch_address).toBuffer(),
                wallet.publicKey.toBuffer(),
            ],
            PROGRAM_ID
        );

        const [mintAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("mint"), new PublicKey(launch.token_launch_address).toBuffer()],
            PROGRAM_ID
        );

        const fetchedContributorAccountNullable =
            await program?.account.contributorAccount.fetchNullable(contributorAccountPDA);

        if (fetchedContributorAccountNullable == null) {
            console.log("No Contributor Account initialize one");

            await program?.methods
                .initContributorAccount(new PublicKey(launch.token_launch_address))
                .accounts({
                    contributorAccount: contributorAccountPDA,
                    payer: wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            console.log("Contributor Account created");
        }

        const userTokenLaunchBytes = new ArrayBuffer(8);
        const dataView = new DataView(userTokenLaunchBytes);

        if (!idToUse) {
            console.log("NO ID");
            return;
        }
        dataView.setBigUint64(0, BigInt(idToUse), true); // true for little-endian

        const [tokenLaunchpadAccountPDA] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("tokenlaunchpad"),
                wallet.publicKey.toBuffer(),
                Buffer.from(new Uint8Array(userTokenLaunchBytes)),
            ],
            PROGRAM_ID
        );

        const fetchedtokenLaunchpadAccount =
            await program?.account.tokenLaunchpadAccount.fetchNullable(tokenLaunchpadAccountPDA);

        console.log(fetchedtokenLaunchpadAccount?.maxAllocPerWallet.toNumber());
        console.log(fetchedtokenLaunchpadAccount?.minContributionPerWallet.toNumber());
        console.log(fetchedtokenLaunchpadAccount?.tokenRate.toNumber());
        console.log(fetchedtokenLaunchpadAccount?.tokensDistributed.toNumber());
        console.log(fetchedtokenLaunchpadAccount?.totalSupply.toNumber());
        console.log(fetchedtokenLaunchpadAccount?.authority.toBase58());

        // return;

        const contributorTokenAccount = await getAssociatedTokenAddress(
            mintAccountPDA,
            wallet.publicKey,
            false
        );

        const contributionAmount = new BN(joinSaleAmount * LAMPORTS_PER_SOL);

        const launchContribution = await program?.methods
            .contributeToLaunch(
                new PublicKey(launch.creator_pubkey),
                new BN(idToUse),
                contributionAmount
            )
            .accounts({
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                contributorTokenAccount: contributorTokenAccount,
                launchpadMintAccount: mintAccountPDA,
                payer: wallet.publicKey,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                tokenLaunchpadAccount: new PublicKey(launch.token_launch_address),
                contributorAccount: contributorAccountPDA,
                whitelistAccount: null,
            })
            .signers([])
            .rpc();

        console.log(launchContribution);
        console.log("Successfully contributed to launch");
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] max-h-[30rem] overflow-y-auto appearance-none">
                <DialogHeader>
                    <DialogTitle>{launch.project_token_name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                            src={xcv}
                            alt={launch.project_token_name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">{launch.project_description}</p>
                    {/* Add more details here as needed */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Token Symbol:</div>
                        <div>{launch.project_token_symbol}</div>
                        <div>Total Supply:</div>
                        <div>{launch.project_token_total_supply}</div>
                        <div>Creator:</div>
                        <div>
                            {`${String(launch.creator_pubkey).substring(0, 5)}...${String(
                                launch.creator_pubkey
                            ).slice(-5)}`}
                        </div>
                        {launchMintAddress ? (
                            <>
                                <div>Token Mint:</div>
                                <div>
                                    {`${String(launchMintAddress).substring(0, 5)}...${String(
                                        launchMintAddress
                                    ).slice(-5)}`}
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        <div>Max Allocation:</div>
                        <div>{launch.max_alloc}</div>
                        <div>Min Contribution:</div>
                        <div>{launch.min_contribution}</div>
                    </div>
                    <section className="flex flex-col w-full space-y-2 justify-center items-center">
                        {wallet && wallet.publicKey == launch.creator_pubkey ? (
                            <button className="rounded-lg appearance-none py-2 px-6 outline-none border-none transition-all duration-300 bg-[#CFFFCF] text-[#002900] hover:bg-[#008F00] hover:bg-opacity-90 hover:text-[#CFFFCF]">
                                Add Whitelist
                            </button>
                        ) : (
                            <></>
                        )}
                        <section className="flex flex-col w-full space-y-3">
                            <input
                                type="text"
                                className="w-full rounded-lg py-3 text-[#CFFFCF] px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                                placeholder="0.1"
                                required
                                name="min_contribution"
                                inputMode="decimal" // Optimized for numeric input on mobile
                                pattern="^\d*(\.\d{0,4})?$" // Allow up to 4 decimal places
                                title="Enter a valid number with up to 4 decimal places"
                                onInput={handleInput}
                            />
                            <button
                                onClick={() => {
                                    joinSale();
                                }}
                                className="rounded-lg appearance-none py-2 px-6 outline-none border-none transition-all duration-300 bg-[#CFFFCF] text-[#002900] hover:bg-[#008F00] hover:bg-opacity-90 hover:text-[#CFFFCF]"
                            >
                                Join Sale
                            </button>
                        </section>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}
