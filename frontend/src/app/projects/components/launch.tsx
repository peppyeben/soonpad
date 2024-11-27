import Image from "next/image";
import Link from "next/link";

import xcv from "@/assets/soonpadx.png";

export default function Launch() {
    return (
        <div className="max-w-[20rem] max-h-[40rem] flex flex-col space-y-2 rounded-lg overflow-hidden shadow-lg bg-[#CFFFCF]">
            <section className="min-w-full max-h-[13rem] mx-auto overflow-hidden">
                <Image
                    className="mx-auto object-cover w-full h-full scale-150 origin-center"
                    src={xcv}
                    alt="Sunset in the mountains"
                />
            </section>
            <div className="px-4 py-4 flex flex-col space-y-3">
                <div className="font-black text-xl text-gray-950">
                    The Coldest Sunset
                </div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
        </div>
    );
}
