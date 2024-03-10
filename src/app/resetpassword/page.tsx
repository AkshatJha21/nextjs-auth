"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    
    const router = useRouter();
    const [user, setUser] = useState({
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/resetpassword', user);
            router.push('/login');
        } catch (error: any) {
            console.log("Password reset failure", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">{loading ? "Processing" : "Reset Password"}</h1>
                <label className="text-sm mb-1" htmlFor="password">New Password</label>
                <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
                <button onClick={resetPassword} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">{buttonDisabled ? "Enter Password" : "Set Password"}</button>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">Back To Login</Link>
            </div>
        </div>
     );
}
 
export default ResetPasswordPage;