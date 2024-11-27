// import dynamic from "next/dynamic";

// // Create a client-side only version of the form component
// const CreateTokenLaunchForm = dynamic(
//     () => import("./components/create-token-launch-form"),
//     {
//         ssr: false,
//         loading: () => (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//         ),
//     }
// );

// export default function CreatePage() {
//     return <CreateTokenLaunchForm />;
// }

"use client"

import CreateTokenLaunchForm from "./components/create-token-launch-form";

export default function CreatePage() {
    return <CreateTokenLaunchForm />;
}
