"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
            toast.success("Email verified");
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-5/12">
                <h1 className="mb-4 font-semibold text-lg">Verify Your Email</h1>
                <p className="text-sm mb-1">Your token:</p>
                <h2 className="p-2 text-center text-xs bg-zinc-200 rounded-md font-light text-black">{token ? `${token}` : "No token"}</h2>

                {verified && (
                    <div>
                        <h2 className="text-lg mt-4 text-green-400">Your email is verified.</h2>
                        <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">
                            Go To Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                    <h2 className="text-2xl bg-rose-500">Error</h2>
                </div>
                )}
            </div>
        </div>
    )
}