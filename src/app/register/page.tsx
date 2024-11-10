"use client";
import register from "@/api/auth/register.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registerUser = await register(
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        roomNumber,
      );

      if (registerUser && registerUser.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="bg-amber-100 text-stone-900/80 h-dvh pt-16 p-4 w-full flex items-center justify-center ">
        <div className="flex gap-4 flex-col bg-white w-[36rem] h-auto p-4 items-center justify-center py-8 stonemodal">
          <h1 className="text-3xl font-bold">REGISTER</h1>
          <form className="w-full sm:px-16" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                name="email"
                id="email"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                required
                type="text"
                name="username"
                id="username"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                required
                type="password"
                name="password"
                id="password"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                id="firstName"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                required
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Room Number</label>
              <input
                required
                type="text"
                name="roomNumber"
                id="roomNumber"
                className="mt-1 p-2 w-full border-pink-400 border-2 shadow-sm focus:outline-none sm:text-sm"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="w-full p-2 pinkbtn font-bold hover:-rotate-3 active:-rotate-0 h-16 origin-bottom text-2xl">
                REGISTER
              </button>
            </div>
          </form>
          <div>
            If you already have an account, please&nbsp;
            <Link href="/login">
              <button className="p-2 stonebtn font-bold px-4">log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
