"use client";
import ListOrder from "@/components/listOrder";
import CreateOrderPopup from "@/components/createOrderPopup";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div
      className="w-100vw justify-center justify-items-start flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-20"
    >
      <div className="flex w-full h-full p-5 pt-12">
        <ListOrder />
        <Sidebar />
      </div>
    </div>
  );
}
