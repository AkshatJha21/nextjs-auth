"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">{loading ? "Processing" : "Login"}</h1>
                <div className="flex flex-col">
                    <label className="text-sm mb-1" htmlFor="email">Email</label>
                    <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="text" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email" />
                    <label className="text-sm mb-1" htmlFor="password">Password</label>
                    <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
                </div>
                <button onClick={onLogin} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">{buttonDisabled ? "Enter Details" : "Login"}</button>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/signup">Not a user? Sign Up</Link>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/resetpassword">Forgot password</Link>
            </div>
        </div>
    )
}