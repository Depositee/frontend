"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import NavItem from "./navItems";
import { AuthContext } from "@/contexts/AuthContext";
import logout from "@/api/auth/logout.api";
import { UserData } from "@/interface/auth/user";
import { connectWebSocket } from "@/websocket/connectWebSocket";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

  const { isLogin , setIsLogin ,currentUser, setCurrentUser} = useContext(AuthContext);

  const handleLogout = async() =>{
    await logout()
    setIsLogin(false)
    setCurrentUser(null)
    window.location.reload()
  }

  useEffect(() => {
    if(isLogin && currentUser != null && currentUser.data){
      const userData : UserData = currentUser.data.user
      connectWebSocket(userData)
    }
  }, [currentUser, isLogin]);
  return (
    <div className="h-16 fixed top-0 left-0 right-0 z-30 flex flex-row justify-end items-center px-8 gap-8">
      {<NavItem path="/" title="Home" />}
      {isLogin ? (
        <NavItem path="/" title="Log Out" onClick={handleLogout} />
      ) : (
        <>
          <NavItem path="/login" title="Log In" />
          <NavItem path="/register" title="Register" />
        </>
      )}

      <div className="relative h-full justify-center align-center flex">
        <Image src="/globe.svg" alt="logo" width={24} height={24} />
      </div>
      <ToastContainer />
    </div>
  );
};
