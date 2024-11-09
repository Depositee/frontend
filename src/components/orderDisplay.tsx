import { Order } from "@/interface/order/order";
export default function OrderDisplay({ orderItem }: { orderItem: Order }) {
  return (
    <div className="flex flex-col bg-white p-4 card min-h-48">
      <h1 className="text-2xl font-bold">
        {orderItem.package_name}
      </h1>
      <p className="text-lg">
        {orderItem.package_description}
      </p>
      <p className="text-lg">
        weight : {orderItem.package_weight}
      </p>
      <p className="text-lg">
        status : {orderItem.status}
      </p>
    </div>
  );
}
