"use client";

const ResetPasswordPage = () => {
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Reset Password</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input className="p-2 text-black border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-rose-500" type="text" id="email" placeholder="email" />
            <button className="p-2 border border-gray-300 rounded-md mb-4">Reset</button>
        </div>
     );
}
 
export default ResetPasswordPage;