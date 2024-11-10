import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function LogOut(){
    {/* clear session*/}
    
    const { setIsLogin ,setCurrentUser} = useContext(AuthContext);
    setIsLogin(false);
    setCurrentUser(null);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">You have been logged out</h1>
        </div>
    )
}