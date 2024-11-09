"use client";
import login from "@/api/auth/login.api";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(event : React.FormEvent) =>{
        event.preventDefault();
        try {
            const loginUser = await login(email,password);

            if (loginUser) {
                // setIsLogin(true);
                // getCurrentEntity().then((Response) => {
                //     setCurrentEntity(Response);
                //     setAccType(getCurrentEntityType(Response))
                // });
                // router.push("/")
            }
        } catch (error) {
            // setIsLogin(false);
            console.error("Error during login:", error);
        }
    }
    return (
        <>
        
            <div className="bg-amber-100 text-stone-900/80 h-dvh pt-16 p-4 w-full flex items-center justify-center ">
                <div className="flex gap-4 flex-col bg-white w-[36rem] h-96 p-4 items-center justify-center py-64 stonemodal">
                    
                    <h1 className="text-3xl font-bold">Log In</h1>
                    <form className="w-full sm:px-16" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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