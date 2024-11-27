import Image from "next/image";

import xcv from "@/assets/soonpadx.png";
import { LaunchDetailsModal } from "./launch-details-modal";
import { useState } from "react";

export default function Launch(launch: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showTokenlaunch = () => {
        console.log(launch.launch)
        setIsModalOpen(true);
    };

    return (
        <div
            onClick={() => {
                showTokenlaunch();
            }}
            className="cursor-pointer max-w-[20rem] max-h-[40rem] flex flex-col space-y-2 rounded-lg overflow-hidden transition-all duration-300 shadow-lg bg-[#CFFFCF] hover:scale-105"
        >
            <section className="min-w-full max-h-[13rem] mx-auto overflow-hidden">
                <Image
                    className="mx-auto object-cover w-full h-full scale-150 origin-center"
                    src={xcv}
                    alt="Sunset in the mountains"
                />
            </section>
            <div className="px-4 py-4 flex flex-col space-y-3">
                <div className="font-black text-xl text-gray-950">
                    {launch.launch.project_token_name}
                </div>
                <p className="text-gray-700 text-base text-wrap breakw">
                    {launch.launch.project_description}
                </p>
            </div>
            <LaunchDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                launch={launch.launch}
            />
        </div>
    );
}
