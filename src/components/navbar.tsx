import React from "react";
import Image from "next/image";
import NavItem from "./navItems";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Navbar: React.FC = async () => {
  const session = null;
  // const session = await getServerSession(authOptions);
  return (
    <div className="h-16 fixed top-0 left-0 right-0 z-30 flex flex-row justify-end items-center px-8 gap-8">
      {<NavItem path="/" title="Home" />}
      {session ? (
        <NavItem path="/api/auth/signout" title="Log Out" />
      ) : (
        <NavItem path="/login" title="Log In" />
      )}

      <div className="relative h-full justify-center align-center flex">
        <Image src="/globe.svg" alt="logo" width={24} height={24} />
      </div>
    </div>
  );
};

export default Navbar;
