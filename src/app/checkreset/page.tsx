"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
    
    const router = useRouter();
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        password: ""
    });

    const verifyToken = async () => {
        try {
            await axios.post('/api/users/checkreset', {token});
            setVerified(true);
            toast.success("User verified");
        } catch (error: any) {
            setError(true);
            toast.error("Something went wrong");
            console.log(error.response.data);
        }
    }

    const resetPassword = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/resetpassword', {token, password: user.password});
            toast.success("Password changed");
            router.push('/login');
        } catch (error: any) {
            console.log("Password reset failure", error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyToken();
        }
    }, [token]);

    useEffect(() => {
        if (user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-5/12">
            <h1 className="mb-4 font-semibold text-lg">Verify Reset Token</h1>
                <p className="text-sm mb-1">Your token:</p>
                <h2 className="p-2 text-center text-xs bg-zinc-200 rounded-md font-light text-black">{token ? `${token}` : "No token"}</h2>

                {verified && (
                    <div className="flex flex-col justify-center mt-4">
                        <h1 className="mb-4 font-semibold text-lg">{loading ? "Processing" : "Reset Password"}</h1>
                        <label className="text-sm mb-1" htmlFor="password">New Password</label>
                        <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
                        <button onClick={resetPassword} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">{buttonDisabled ? "Enter Password" : "Set Password"}</button>
                    </div>
                )}

                {error && (
                    <div>
                    <h2 className="text-xl mt-4 text-rose-500">Error</h2>
                </div>
                )}

                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">Back To Login</Link>
            </div>
        </div>
     );
}
 
export default ResetPasswordPage;