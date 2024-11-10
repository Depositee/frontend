import { useState } from "react";
import CreateOrderPopup from "./createOrderPopup";
import { useRouter } from "next/navigation";
import CreateOrderForm from "./createOrderForm";

export default function Sidebar() {
  
  const onCloseModal = () => setShowPopup(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter()

  const handleMyOrderButton = () =>{
    router.push("/order")
  }
  const handleMyAcceptedOrderButton = () =>{
    router.push("/accepted")
  }
  return (
    <>
      <div className="bg-white p-5 ml-auto justify-between flex flex-col md:flex-row fixed bottom-0 right-0 w-dvw gap-4 border-t-2 border-pink-400">
        <div className="relative top-0 flex gap-2">
          <button className="p-2 pinkbtn font-bold px-4" onClick={handleMyOrderButton}>My order</button>
          <button className="p-2 pinkbtn font-bold px-4" onClick={handleMyAcceptedOrderButton}>My Accepted Order</button>
        </div>
        <div className="relative bottom-0 mt-auto">
          <button
            onClick={() => setShowPopup(true)}
            className="h-full amberbtn font-extrabold"
          >
            Create Order
          </button>
        </div>
      </div>
      {showPopup && (
          <CreateOrderPopup onClose={onCloseModal}>
            <CreateOrderForm onClose={onCloseModal}/>
          </CreateOrderPopup>
        )}
    </>
  );
}
