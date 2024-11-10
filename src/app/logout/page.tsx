"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

export default function LogOut() {
  const { setIsLogin, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    // Clear session and update the context values on client side
    setIsLogin(false);
    setCurrentUser(null);
  }, [setIsLogin, setCurrentUser]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">You have been logged out</h1>
    </div>
  );
}
