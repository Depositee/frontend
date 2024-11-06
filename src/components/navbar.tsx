import React from "react";
import Image from "next/image";
import NavItem from "./navItems";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Navbar: React.FC = async () => {
  const session = null;
  // const session = await getServerSession(authOptions);
  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row justify-end">
      {/* <NavItem path="/" title="Home" /> */}
      {session ? (
        <NavItem path="/api/auth/signout" title="logout" />
      ) : (
        <NavItem path="/api/auth/signin" title="login" />
      )}

      <div className="relative h-full justify-center align-center">
        <Image src="/globe.svg" alt="logo" width={40} height={40} />
      </div>
    </div>
  );
};

export default Navbar;
