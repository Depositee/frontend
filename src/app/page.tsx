"use client";
import ListOrder from "@/components/listOrder";
import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  useEffect(() => {
    const mockUserId = 3
    const ws = new WebSocket(`ws://localhost:8088?userId=${mockUserId}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      toast.info(`New notification: ${message.message}`);
    };

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-20">
      <div className="flex w-full h-full p-5 pt-12">
        <ListOrder />
        <Sidebar />
      </div>
      <ToastContainer />
    </div>
  );
}
