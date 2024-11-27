"use client";

import React, { useEffect, useState } from "react";
import Launch from "./components/launch";

export default function Projects() {
    const [programTokenLaunches, setProgramTokenLaunches] = useState<any[] | null>(null);

    useEffect(() => {
        async function getTokenLaunches() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SOONPAD_BACKEND_API as string}/launchpad`,
                {
                    method: "GET",
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

            if (responseData.success) {
                const launchedTokens = responseData.tokenLaunches.filter(
                    (x: any) => x.token_launch_address
                );
                setProgramTokenLaunches(launchedTokens);
                console.log(launchedTokens);
            }
        }

        getTokenLaunches();
    }, []);

    useEffect(() => {
        if (programTokenLaunches && programTokenLaunches.length > 0) {
            console.log(programTokenLaunches);
        }
    }, [programTokenLaunches]);
    return (
        <section className="grid grid-cols-3 gap-6 rounded-lg p-6 shadow-lg bg-[#002900] text-[#CFFFCF] xl:grid-cols-4">
            {programTokenLaunches && programTokenLaunches.length > 0 ? (
                programTokenLaunches.map((launch: any, index: number) => (
                    <Launch key={index} launch={launch}></Launch>
                ))
            ) : (
                <>
                    <p className="font-bold">Nothing here yet...</p>
                </>
            )}
        </section>
    );
}
