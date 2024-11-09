"use client";

import { useState, useEffect } from "react";

import OrderDisplay from "./orderDisplay";
import getMyOrders from "@/api/order/getMyOrder.api";
import { GetMyOrders, Order } from "@/interface/order/order";

export default function ListOrder({}: {}) {
  const [orderItems, setOrderItems] = useState<Order[]>([]);

  const fetchMyOrders = async() =>{
    const myOrders : GetMyOrders= await getMyOrders()
    console.log('my order',myOrders)
    if(myOrders.success && myOrders.data.data){
      setOrderItems(myOrders.data.data)
    }
  }
  useEffect(() => {
    fetchMyOrders()
  }, []);
  return (
    <div className="p-4 w-full grid md:grid-cols-2 xl:grid-cols-4 overflow-y-auto gap-4">
      {orderItems.length == 0 ? (
        <p>No Order</p>
      ) : (
        orderItems.map((orderItem, index) => {
          return (
            <OrderDisplay key={index} orderItem={orderItem}></OrderDisplay>
          );
        })
      )}
    </div>
  );
}
