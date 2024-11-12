"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NavItem from "./navItems";
import { AuthContext } from "@/contexts/AuthContext";
import logout from "@/api/auth/logout.api";
import { GetUserData, UserData } from "@/interface/auth/user";
import { connectWebSocket } from "@/websocket/connectWebSocket";
import getUserData from "@/api/auth/getUserData.api";

export default function Navbar() {

  const { isLogin , setIsLogin ,currentUser, setCurrentUser} = useContext(AuthContext);
  const [userName , setUserName] = useState<string>('')
  const [userID , setUserID] = useState<string>('')

  const handleLogout = async() =>{
    await logout()
    setIsLogin(false)
    setCurrentUser(null)
    setUserName(null)
  }

  useEffect(() => {
    const timer = setTimeout( async() => {
      if (isLogin && currentUser != null && currentUser.data.user) {
        const userData: UserData = currentUser.data.user;
        connectWebSocket(userData);
        const userProfile : GetUserData | undefined= await getUserData(userData.id)
        if(userProfile){
          setUserName(userProfile.data.username)
          setUserID(userData.id)
        }

      }
    }, 500); 

    return () => clearTimeout(timer);
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
      {
        userName && userName !== '' ? 
          <NavItem  path={`/review/${userID}`} title={`@${userName}`}/>
        : null  
      }
      <div className="relative h-full justify-center align-center flex">
        <Image src="/globe.svg" alt="logo" width={24} height={24} />
      </div>
    </div>
  );
};
