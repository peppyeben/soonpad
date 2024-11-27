"use client";

import { ImageUploader } from "@/components/image-uploader";
import {
    useWallet,
    useAnchorWallet,
    useConnection,
} from "@solana/wallet-adapter-react";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SendTransactionError,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import React, { useEffect, useMemo, useState } from "react";

import soonpad_idl from "@/utils/soonpad.json";
import { AnchorProvider, BN, Program, setProvider } from "@coral-xyz/anchor";
import { HelloAnchor } from "@/types/HelloAnchor";

const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_SOONPAD_PROGRAM_ID as string
);

interface FormData {
    project_token_name: string;
    project_token_symbol: string;
    project_description: string;
    project_token_total_supply: string;
    max_alloc: string;
    min_contribution: string;
    token_sale_rate: string;
    creator_pubkey: string;
    whitelist_available: boolean;
    contact_telegram_handle?: string;
    links: {
        website: string;
        project_twitter?: string;
        pitch_deck?: string;
        other_links?: string;
    };
    images: {
        project_logo: string | null;
        project_banner: string | null;
    };
}

export default function Page() {
    const { publicKey, disconnect, connected, wallets, select, connecting } =
        useWallet();

    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const [program, setProgram] = useState<Program<HelloAnchor> | null>(null);

    const provider = useMemo(() => {
        if (!wallet) return null;
        return new AnchorProvider(
            connection,
            wallet,
            AnchorProvider.defaultOptions()
        );
    }, [connection, wallet]);

    useEffect(() => {
        if (provider) {
            const program = new Program(
                soonpad_idl as HelloAnchor,
                PROGRAM_ID,
                provider
            );
            setProgram(program);
        }
    }, [provider]);

    const [formData, setFormData] = useState<FormData>({
        project_token_name: "",
        project_token_symbol: "",
        project_description: "",
        project_token_total_supply: "",
        max_alloc: "",
        min_contribution: "",
        creator_pubkey: "",
        token_sale_rate: "",
        contact_telegram_handle: "",
        whitelist_available: false,
        links: {
            website: "",
            project_twitter: "",
            pitch_deck: "",
            other_links: "",
        },
        images: {
            project_logo: null,
            project_banner: null,
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        // Check if the name corresponds to the whitelist field
        if (name === "whitelist_available") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value === "true", // Convert string to boolean
            }));
        } else if (name.startsWith("links.")) {
            const linkField = name.split(".")[1]; // Extract the link field (website, twitter, etc.)
            setFormData((prevData) => ({
                ...prevData,
                links: {
                    ...prevData.links,
                    [linkField]: value, // Update the correct link field
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // Update top-level fields
            }));
        }
    };

    const handleImageUpload = (imageId: string, akordId: string | null) => {
        setFormData((prevData) => ({
            ...prevData,
            images: {
                ...prevData.images,
                [imageId]: akordId ? akordId : null,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!connected) {
            console.log("Please connect your wallet");
            return;
        }
        const removeEmptyValues = (obj: any): any => {
            if (Array.isArray(obj)) {
                return obj.map(removeEmptyValues);
            }

            if (typeof obj === "object" && obj !== null) {
                return Object.fromEntries(
                    Object.entries(obj)
                        .filter(
                            ([key, value]) => value !== "" && value !== null
                        )
                        .map(([key, value]) => [key, removeEmptyValues(value)])
                );
            }

            return obj;
        };

        const cleanedFormData = removeEmptyValues(formData);

        const dataToSubmit = {
            ...cleanedFormData,
            images: {
                project_logo: cleanedFormData.images.project_logo,
                project_banner: cleanedFormData.images.project_banner,
            },
        };

        try {
            const response = await fetch(
                `${
                    process.env.NEXT_PUBLIC_SOONPAD_BACKEND_API as string
                }/launchpad`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        data: {
                            ...dataToSubmit,
                            creator_pubkey: wallet?.publicKey,
                        },
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        AuthenticateSOONPad: process.env
                            .NEXT_PUBLIC_SOONPAD_BACKEND_HEADER_VALUE as string,
                    },
                }
            );

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error:", errorDetails);
                throw new Error(`Request failed: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Success:", responseData);

            if (responseData.success) {
                console.log("Token launch created:", responseData.result);

                await initTokenLaunch(dataToSubmit, responseData.result);
            }
        } catch (error) {
            console.error("Error submitting token launch:", error);
        }
    };

    const initTokenLaunch = async (data: any, metadata: any) => {
        console.log(data);

        const tokenConfig = {
            name: data.project_token_name,
            symbol: data.project_token_symbol,
            uri: metadata,
            decimals: 9,
            totalSupply: new BN(
                data.project_token_total_supply * LAMPORTS_PER_SOL
            ),
            tokenRate: new BN(data.token_sale_rate * LAMPORTS_PER_SOL),
            maxAllocPerWallet: new BN(data.max_alloc * LAMPORTS_PER_SOL),
            minContributionPerWallet: new BN(
                data.min_contribution * LAMPORTS_PER_SOL
            ),
        };

        try {
            if (!wallet?.publicKey) {
                throw new Error("Wallet public key is not available.");
            }

            const [userAccountPDA, userAccountBump] =
                PublicKey.findProgramAddressSync(
                    [Buffer.from("useraccount"), wallet.publicKey.toBuffer()],
                    PROGRAM_ID
                );

            const fetchNullUserAccount =
                await program?.account.userAccount.fetchNullable(
                    userAccountPDA
                );

            if (fetchNullUserAccount == null) {
                await program?.methods
                    .createUserAccount()
                    .accounts({
                        userAccount: userAccountPDA,
                        payer: wallet?.publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .signers([])
                    .rpc();
            }

            const fetchUserAccount = await program?.account.userAccount.fetch(
                userAccountPDA
            );

            const noOfTokenLaunches =
                fetchUserAccount?.noOfTokenLaunches.toNumber();
            const userTokenLaunchBytes = new ArrayBuffer(8);
            const dataView = new DataView(userTokenLaunchBytes);

            dataView.setBigUint64(0, BigInt(noOfTokenLaunches), true);

            const [tokenLaunchpadAccountPDA] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("tokenlaunchpad"),
                    wallet.publicKey.toBuffer(),
                    Buffer.from(new Uint8Array(userTokenLaunchBytes)),
                ],
                PROGRAM_ID
            );

            const [mintAccountPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("mint"), tokenLaunchpadAccountPDA.toBuffer()],
                PROGRAM_ID
            );

            const [tokenMetadataAccountPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("metadata"), mintAccountPDA.toBuffer()],
                PROGRAM_ID
            );

            const tokenLaunchMetadata = metadata;
            const isWLAvailable = data.whitelist_available;

            const initTokenLaunch = await program?.methods
                .initializeTokenLaunch(
                    tokenConfig,
                    tokenLaunchMetadata,
                    isWLAvailable
                )
                .accounts({
                    userAccount: userAccountPDA,
                    tokenLaunchpadAccount: tokenLaunchpadAccountPDA,
                    mint: mintAccountPDA,
                    tokenMetadataAccount: tokenMetadataAccountPDA,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    payer: wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY,
                })
                .signers([])
                .rpc();

            console.log(initTokenLaunch);

            const response = await fetch(
                `${
                    process.env.NEXT_PUBLIC_SOONPAD_BACKEND_API as string
                }/launchpad`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        data: {
                            token_launch_address:
                                tokenLaunchpadAccountPDA.toBase58(),
                        },
                        doc_id: metadata,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        AuthenticateSOONPad: process.env
                            .NEXT_PUBLIC_SOONPAD_BACKEND_HEADER_VALUE as string,
                    },
                }
            );

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error:", errorDetails);
                throw new Error(`Request failed: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Success:", responseData);

            if (responseData.success) {
                console.log(
                    "Token launch created on program:",
                    responseData.result
                );
            }
        } catch (error) {
            console.log(error);
            if (error instanceof SendTransactionError) {
                const logs = error.getLogs(connection);
                console.error("Transaction Error Logs:", logs);
            }
            console.error("Transaction Error:", error);
        }
    };

    return (
        <section className="flex flex-col justify-start items-start w-full px-10">
            <p className="text-2xl font-bold text-left">
                Start your token launch on SOONPAD
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start items-start w-1/2 py-7 space-y-6 mr-auto"
            >
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Project Token Name *
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="SOON Foundation"
                        name="project_token_name"
                        required
                        value={formData.project_token_name}
                        onChange={handleChange}
                    />
                </section>

                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Project Token Symbol *
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="SFN"
                        name="project_token_symbol"
                        required
                        value={formData.project_token_symbol}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Token Total Supply *
                    </label>
                    <input
                        type="number"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="100000"
                        required
                        name="project_token_total_supply"
                        min={1}
                        value={formData.project_token_total_supply}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Maximum allocation (tokens) *
                    </label>
                    <input
                        type="number"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="10"
                        min={1}
                        name="max_alloc"
                        required
                        value={formData.max_alloc}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Minimum Contribution (SOL) *
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="0.1"
                        required
                        name="min_contribution"
                        pattern="^\d*(\.\d{0,3})?$"
                        title="Enter a valid number not less than 0.001"
                        value={formData.min_contribution}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Project Description *
                    </label>
                    <textarea
                        name="project_description"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="SOON Foundation is aimed at..."
                        rows={5}
                        required
                        value={formData.project_description}
                        onChange={handleChange}
                    ></textarea>
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Token Sale Rate *
                    </label>
                    <input
                        type="number"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="100000"
                        min={1}
                        name="token_sale_rate"
                        value={formData.token_sale_rate}
                        onChange={handleChange}
                    />
                </section>

                <p className="p-4 text-lg uppercase">socials</p>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Website *
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="https://soonfoundation.network"
                        required
                        name="links.website"
                        value={formData.links.website}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Telegram
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="@soonfoundation"
                        name="contact_telegram_handle"
                        value={formData.contact_telegram_handle}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Twitter
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="https://x.com/soonfoundation"
                        name="links.project_twitter"
                        value={formData.links.project_twitter}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Whitepaper/Pitch Deck
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="https://soonfoundation.network/whitepaper"
                        name="links.pitch_deck"
                        value={formData.links.pitch_deck}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Other links{" "}
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg pt-6 text-[#CFFFCF] pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        placeholder="https://soonfoundation.network/about"
                        name="links.other_links"
                        value={formData.links.other_links}
                        onChange={handleChange}
                    />
                </section>
                <section className="flex flex-col w-full relative">
                    <label className="text-xs absolute top-[0.3rem] left-4 text-[#ffffff] text-opacity-55">
                        Whitelist available
                    </label>
                    <select
                        className="custom-select cursor-pointer w-full rounded-lg appearance-none text-[#CFFFCF] pt-6 pb-3 px-4 outline-none border-none placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#002900] bg-opacity-80"
                        name="whitelist_available"
                        defaultValue={"false"}
                        onChange={handleChange}
                    >
                        <option
                            value="true"
                            className="text-[#CFFFCF] cursor-pointer bg-[#002900] bg-opacity-80"
                        >
                            Yes
                        </option>
                        <option
                            value="false"
                            className="text-[#CFFFCF] cursor-pointer bg-[#002900] bg-opacity-80"
                        >
                            No
                        </option>
                    </select>
                </section>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-[#ffffff] text-opacity-55">
                            Project Logo
                        </label>
                        <ImageUploader
                            onImageUpload={handleImageUpload}
                            label="Project Logo"
                            id="project_logo"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-[#ffffff] text-opacity-55">
                            Project Banner
                        </label>
                        <ImageUploader
                            onImageUpload={handleImageUpload}
                            label="Project Banner"
                            id="project_banner"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-[#002900] bg-[#A7FFA7] px-4 py-2 rounded-md transition-all duration-300 hover:bg-opacity-80"
                >
                    Create Token Launch
                </button>
            </form>
        </section>
    );
}
