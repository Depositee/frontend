import { Order } from "@/interface/order/order";
import { useRouter } from "next/navigation";

export default function OrderDisplay({ orderItem }: { orderItem: Order }) {

  const router = useRouter()

  const handleOnClick = () =>{
    router.push(`/order/${orderItem.id}`)
  }
  
  return (
    <div className="flex flex-col bg-white p-4 card min-h-48" onClick={handleOnClick}>
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{orderItem.package_name}</h2>
        <p className="text-sm text-gray-500">Package Weight: {orderItem.package_weight} kg</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Payment Amount:</span>
          <span className="text-gray-800">${orderItem.payment_amount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Status:</span>
          <span className={`px-2 py-0.5 rounded-full text-white ${orderItem.status === 'placed' ? 'bg-red-500' : orderItem.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {orderItem.status}
          </span>
        </div>

      </div>
    </div>
  );
}
