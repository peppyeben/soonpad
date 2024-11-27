"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { WalletProvider } from "@solana/wallet-adapter-react";
import {
    useWallet,
    useConnection,
    useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-wallets";

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

const CreateTokenLaunchPage: React.FC = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();

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

        if (name === "whitelist_available") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value === "true",
            }));
        } else if (name.startsWith("links.")) {
            const linkField = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                links: {
                    ...prevData.links,
                    [linkField]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
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

        if (!wallet.connected) {
            console.log("Please connect your wallet");
            return;
        }

        try {
            // Implement full submission logic
            console.log("Form submitted", formData);
            console.log("Wallet pubkey:", wallet.publicKey?.toBase58());
        } catch (error) {
            console.error("Submission error", error);
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
                {/* ... rest of the form fields remain the same ... */}
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
};

export default function Page() {
    const wallets = useMemo(() => [new NightlyWalletAdapter()], []);

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <CreateTokenLaunchPage />
        </WalletProvider>
    );
}
