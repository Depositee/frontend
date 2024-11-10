"use client";
import getAllOrders from "@/api/order/getAllOrder.api";
import ListOrder from "@/components/listOrder";
import Sidebar from "@/components/sidebar";
import { GetMyOrders, Order } from "@/interface/order/order";
import { useEffect, useState } from "react";

export default function Home() {
  const [orderItems, setOrderItems] = useState<Order[]>([]);

  const fetchMyOrders = async() =>{
    const myOrders : GetMyOrders= await getAllOrders()
    if(myOrders.success && myOrders.data.data){
      setOrderItems(myOrders.data.data)
    }
  }
  useEffect(() => {
    fetchMyOrders()
  }, []);

  return (
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-20">
      <div className="flex w-full h-full p-5 pt-12">
        <ListOrder orderItems={orderItems}/>
        <Sidebar />
      </div>
    </div>
  );
}
