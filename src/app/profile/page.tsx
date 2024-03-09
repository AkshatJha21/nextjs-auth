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
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="bg-gray-500 rounded-md p-3">{data === "" ? "No Data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={getUserDetails} className="bg-violet-500 hover:bg-violet-700 mt-4 text-white font-semibold py-2 px-4 rounded-md">Details</button>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-semibold py-2 px-4 rounded-md">Logout</button>
        </div>
    )
}