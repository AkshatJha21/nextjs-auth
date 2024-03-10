import Link from "next/link";

export default function UserProfilePage({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-5/12">
                <h1 className="mb-4 font-semibold text-lg">User Profile</h1>
                <p className="text-sm mb-1">User ID:</p>
                <h2 className="p-2 text-center text-xs bg-zinc-200 rounded-md font-light text-black">{params.id}</h2>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href='/profile'>Back</Link>
            </div>
        </div>
    )
}