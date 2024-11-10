"use client";
import OrderDisplay from "./orderDisplay";
interface ListOrderProps{
  orderItems : Order[]
}

export default function ListOrder(props : ListOrderProps) {
  const orderItems = props.orderItems;
  return (
    <div className="p-4 w-full h-full flex items-center justify-center">
      {orderItems.length == 0 ? (
        <div className="flex items-center justify-center ambermodal w-80 h-40 bg-white">
          <p className="text-3xl font-bold">No Orders</p>
        </div>
      ) : (
        <div className="w0full h-full grid md:grid-cols-2 xl:grid-cols-4 overflow-y-auto gap-4">
          {orderItems.map((orderItem, index) => {
            return (
              <OrderDisplay key={index} orderItem={orderItem}></OrderDisplay>
            );
          })}
        </div>
      )}
    </div>
  );
}
