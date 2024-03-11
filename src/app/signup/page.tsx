"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup successful", response.data);
            toast.success("Signed In");
            router.push('/verifyemail');
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">{loading ? "Processing" : "Sign Up"}</h1>
                <div className="flex flex-col">
                    <label className="text-sm mb-1" htmlFor="username">Username</label>
                    <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="text" id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="username" />
                    <label className="text-sm mb-1" htmlFor="email">Email</label>
                    <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="text" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="user@email.com" />
                    <label className="text-sm mb-1" htmlFor="password">Password</label>
                    <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
                </div>
                <button onClick={onSignup} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">{buttonDisabled ? "Enter Details" : "Sign Up"}</button>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">Already a user? Login</Link>
            </div>
        </div>
    )
}