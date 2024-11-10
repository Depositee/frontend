"use client";
import { Order } from "@/interface/order/order";
import OrderDisplay from "./orderDisplay";

interface ListOrderProps{
  orderItems : Order[]
}

export default function ListOrder(props : ListOrderProps) {
  const orderItems = props.orderItems
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
