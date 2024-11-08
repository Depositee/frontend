"use client";
import orderItems from "@/interface/orderItems.interface.api";
import { useState, useEffect } from "react";
import getOrderItems from "@/api/getOrderItems.api";
import OrderDisplay from "./orderDisplay";

export default function ListOrder({}: {}) {
  const [orderItems, setOrderItems] = useState<orderItems[]>([]);
  useEffect(() => {
    getOrderItems().then((data) => {
      setOrderItems(data);
    });
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
