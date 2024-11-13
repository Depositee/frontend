"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NavItem from "./navItems";
import { AuthContext } from "@/contexts/AuthContext";
import logout from "@/api/auth/logout.api";
import { GetUserData, UserData } from "@/interface/auth/user";
import { connectWebSocket } from "@/websocket/connectWebSocket";
import getUserData from "@/api/auth/getUserData.api";
import getBalance from "@/api/payment/getBalance.api";
import addBalance from "@/api/payment/addBalance.api";

export default function Navbar() {
  const { isLogin, setIsLogin, currentUser, setCurrentUser } =
    useContext(AuthContext);
  const [userName, setUserName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const handleLogout = async () => {
    await logout();
    setIsLogin(false);
    setCurrentUser(null);
    window.location.reload();
  };
  // fetch balance
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (isLogin && currentUser != null && currentUser.data.user) {
        const userData: UserData = currentUser.data.user;
        const balanceData = await getBalance(userData.id);
        if (balanceData) {
          setBalance(balanceData.data.balance);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser, isLogin]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (isLogin && currentUser != null && currentUser.data.user) {
        const userData: UserData = currentUser.data.user;
        connectWebSocket(userData);
        const userProfile: GetUserData | undefined = await getUserData(
          userData.id
        );
        if (userProfile) {
          setUserName(userProfile.data.username);
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
      {userName && userName !== "" ? (
        <div
          className="relative justify-center align-center inline-flex"
          onClick={() => {
            addBalance(currentUser!.data.user.id, 100);
            setBalance(balance + 100);
          }}
        >
          <span className="select-none inline">{userName}</span> : {balance}{" "}
          BATH
        </div>
      ) : null}
      <div className="relative h-full justify-center align-center flex">
        <Image src="/globe.svg" alt="logo" width={24} height={24} />
      </div>
    </div>
  );
}
