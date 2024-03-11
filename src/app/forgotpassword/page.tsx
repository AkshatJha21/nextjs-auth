"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
    // search email if user exists or not
    const router = useRouter();
    const [user, setUser] = useState({
        email: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendEmail = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", user);
            console.log("User found", response.data);
            toast.success("Email verified");
            router.push('/checkreset');
        } catch (error: any) {
            console.log("No user found", error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">{loading ? "Processing" : "Forgot Password"}</h1>
                <label className="text-sm mb-1" htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="text" id="email" placeholder="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                <button onClick={sendEmail} className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">{buttonDisabled ? "Enter Email" : "Send Email"}</button>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">Back To Login</Link>
            </div>
        </div>
     );
}
 
export default ForgotPasswordPage;