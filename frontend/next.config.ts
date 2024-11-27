import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: "/api/v0",
                // source: "api/v0/:path*",
                destination: "http://localhost:3003/api/v0",
            },
        ];
    },
    images: {
        domains: ["api.akord.com"], // Add the hostname here
    },
};

export default nextConfig;
