"use client";
import ListOrder from "@/components/listOrder";
import CreateOrderPopup from "@/components/createOrderPopup";
import { useState, useEffect, use } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    console.log("showPopup", showPopup);
  }, [showPopup]);

  const onCloseModal = () => setShowPopup(false);
  return (
    <div
      className="w-100vw justify-center justify-items-start flex bg-gray-200"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div className="flex w-full p-5">
        <ListOrder />
        <div className="bg-white p-5 ml-auto rounded w-[200px] justify-between flex flex-col">
          <div className="relative top-0">
            <button className="p-2 bg-blue-500 text-white rounded bg-green-400 w-full mb-2">
              My order
            </button>
            <button className="p-2 bg-blue-500 text-white rounded bg-green-400 w-full mb-2">
              My Accepted Order
            </button>
          </div>
          <div className="relative bottom-0 mt-auto">
            <button
              onClick={() => setShowPopup(true)}
              className="p-2 bg-blue-500 text-white rounded w-full mt-2"
            >
              Create Order
            </button>
          </div>
        </div>
        {showPopup && (
          <CreateOrderPopup onClose={onCloseModal}>
            <div>test</div>
          </CreateOrderPopup>
        )}
      </div>
    </div>
  );
}
