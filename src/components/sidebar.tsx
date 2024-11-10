import { useState } from "react";
import CreateOrderPopup from "./createOrderPopup";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  
  const onCloseModal = () => setShowPopup(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter()

  const handleMyOrderButton = () =>{
    router.push("/order")
  }
  return (
    <>
      <div className="bg-white p-5 ml-auto justify-between flex flex-col md:flex-row fixed bottom-0 right-0 w-dvw gap-4 border-t-2 border-pink-400">
        <div className="relative top-0 flex gap-2">
          <button className="p-2 pinkbtn font-bold px-4" onClick={handleMyOrderButton}>My order</button>
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
            <h1 className="text-3xl font-extrabold mb-4">Create Order</h1>
            <form>
              <div className="flex flex-col gap-4">
                <label className="mx-8">Package Appearance</label>
                <input
                  type="text"
                  placeholder="EMS, Registered Mail, a big box"
                  className="p-2 border-2 border-amber-400 lg:mx-8"
                />
                <label className="mx-8">Package Addressed</label>
                <input
                  type="text"
                  placeholder="Your Name, The Package Receiver"
                  className="p-2 border-2 border-amber-400 lg:mx-8"
                />
                <label className="mx-8">Will be receiving at</label>
                <input
                  type="text"
                  placeholder="Room Number, Place of Meetup"
                  className="p-2 border-2 border-amber-400 lg:mx-8"
                />
                <label className="mx-8">Receiver Phone Number</label>
                <input
                  type="text"
                  placeholder="Receiver Phone"
                  className="p-2 border-2 border-amber-400 lg:mx-8"
                />
                <button
                  type="submit"
                  className="p-2 amberbtn font-bold"
                >
                  Create Order
                </button>
              </div>
            </form>
          </CreateOrderPopup>
        )}
    </>
  );
}
