"use client";
import { useEffect, useState } from "react";
import ListOrder from "@/components/listOrder";
import Sidebar from "@/components/sidebar";
import { GetMyOrders, Order } from "@/interface/order/order";
import getMyAcceptedOrders from "@/api/order/getMyAcceptOrder.api";
import { ToastContainer } from "react-toastify";

export default function MyAcceptedOrderPage() {
  const [orderItems, setOrderItems] = useState<Order[]>([]);

  const fetchMyAcceptedOrders = async() =>{
    const myOrders : GetMyOrders= await getMyAcceptedOrders()
    if(myOrders.success && myOrders.data.data){
      setOrderItems(myOrders.data.data)
    }
  }
  useEffect(() => {
    fetchMyAcceptedOrders()
  }, []);
  
  return (
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-20">
      <div className="flex w-full h-full p-5 pt-12 overflow-y-auto">
        <ListOrder orderItems={orderItems}/>
        <Sidebar />
      </div>
    </div>
  );
}
