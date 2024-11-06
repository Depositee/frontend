import orderItems from "@/interface/orderItems.interface.api";
export default function OrderDisplay({ orderItem }: { orderItem: orderItems }) {
  return (
    <div className="m-2 p-2 min-h-[150px] border-solid border-gray-400 border gap-2 rounded flex flex-col">
      <h1>{orderItem.name}</h1>
      <p>{orderItem.description}</p>
    </div>
  );
}
