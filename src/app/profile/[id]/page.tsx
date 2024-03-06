export default function UserProfilePage({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>User Profile</h1>
            <hr />
            <p className="text-4xl">
                User Profile page
                <span className="p-2 rounded bg-yellow-500 text-black">
                {params.id} 
                </span>
            </p>
        </div>
    )
}