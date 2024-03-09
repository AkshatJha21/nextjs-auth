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
            console.log("Login success");
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
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input className="p-2 text-black border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-rose-500" type="text" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email" />
            <label htmlFor="password">Password</label>
            <input className="p-2 text-black border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-rose-500" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-md mb-4">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit signup page</Link>
        </div>
    )
}