import { useState } from "react";
import CreateOrderPopup from "./createOrderPopup";

export default function Sidebar() {
  
  const onCloseModal = () => setShowPopup(false);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div className="bg-white p-5 ml-auto justify-between flex flex-col md:flex-row fixed bottom-0 right-0 w-dvw gap-4 border-t-2 border-pink-400">
        <div className="relative top-0 flex gap-2">
          <button className="p-2 pinkbtn font-bold px-4">My order</button>
          <button className="p-2 pinkbtn font-bold px-4">My Accepted Order</button>
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
            <h1 className="text-3xl font-extrabold">Create Order</h1>
          </CreateOrderPopup>
        )}
    </>
  );
}
