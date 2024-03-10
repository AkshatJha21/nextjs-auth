"use client";

import Link from "next/link";

const ResetPasswordPage = () => {

    // search email if user exists or not
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-slate-800 p-6 rounded-md drop-shadow-md flex flex-col border border-slate-700 w-3/12">
                <h1 className="mb-4 font-semibold text-lg">Reset Password</h1>
                <label className="text-sm mb-1" htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-zinc-500 text-black" type="text" id="email" placeholder="email" />
                <button className="p-2 bg-gray-500 hover:bg-gray-600 transition-all rounded-md mb-4">Send Email</button>
                <Link className="flex justify-center mt-2 text-sm hover:underline" href="/login">Back To Login</Link>
            </div>
        </div>
     );
}
 
export default ResetPasswordPage;