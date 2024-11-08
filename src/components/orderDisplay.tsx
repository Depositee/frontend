import orderItems from "@/interface/orderItems.interface.api";
export default function OrderDisplay({ orderItem }: { orderItem: orderItems }) {
  return (
    <div className="flex flex-col bg-white p-4 card min-h-48">
      <h1 className="text-2xl font-bold">
        {orderItem.name}
      </h1>
      <p className="text-lg">
        {orderItem.description}
      </p>
    </div>
  );
}
