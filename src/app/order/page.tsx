"use client";
import getMyOrders from "@/api/order/getMyOrder.api";
import ListOrder from "@/components/listOrder";
import Sidebar from "@/components/sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { UserData } from "@/interface/auth/user";
import { GetMyOrders, Order } from "@/interface/order/order";
import { connectWebSocket } from "@/websocket/connectWebSocket";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyOrderPage() {
  const { isLogin,currentUser} = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState<Order[]>([]);

  const fetchMyOrders = async() =>{
    const myOrders : GetMyOrders= await getMyOrders()
    if(myOrders.success && myOrders.data.data){
      setOrderItems(myOrders.data.data)
    }
  }
  useEffect(() => {
    fetchMyOrders()
  }, []);
  
  useEffect(() => {
    if(isLogin && currentUser != null){
      const userData : UserData = currentUser.data.user
      connectWebSocket(userData)
    }
  }, [currentUser, isLogin]);

  return (
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-20">
      <div className="flex w-full h-full p-5 pt-12">
        <ListOrder orderItems={orderItems}/>
        <Sidebar />
      </div>
      <ToastContainer />
    </div>
  );
}
