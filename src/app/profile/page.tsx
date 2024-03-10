"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [data, setdata] = useState("");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            console.log("Logout success");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get('/api/users/me');
        console.log(response.data);

        setdata(response.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">Profile</h1>
                <p className="text-sm mb-1">Your userID:</p>
                <h2 className="p-2 text-center text-xs bg-zinc-200 rounded-md font-light text-black">{data === "" ? "No Data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <button onClick={getUserDetails} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mt-4">Details</button>
                <button onClick={logout} className="p-2 bg-rose-500 hover:bg-rose-600 transition-all rounded-md mt-4">Logout</button>
            </div>
        </div>
    )
}