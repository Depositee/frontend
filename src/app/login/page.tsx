import Link from "next/link";

export default function LoginPage(){
    return (
        <>
        
            <div className="bg-amber-100 text-stone-900/80 h-dvh pt-16 p-4 w-full flex items-center justify-center ">
                <div className="flex gap-4 flex-col bg-white w-[36rem] h-96 p-4 items-center justify-center py-64 stonemodal">
                    
                    <h1 className="text-3xl font-bold">Log In</h1>
                    <form className="w-full sm:px-16" method="POST">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="w-full p-2 pinkbtn font-bold hover:rotate-2 active:-rotate-0 h-16 origin-bottom text-2xl">LOG IN</button>
                        </div>                        
                    </form>
                    <button className="p-2 amberbtn font-bold px-4">Forgot Password</button>
                    <div>
                        If you do not have an account, please&nbsp;
                        <Link href="/register"><button className="p-2 stonebtn font-bold px-4">register</button></Link>
                    
                    </div>

                </div>
            </div>
        </>
    )
}