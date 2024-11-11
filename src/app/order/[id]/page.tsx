"use client";
import { useState, useEffect, useContext} from "react";
import Sidebar from "@/components/sidebar";
import { Order } from "@/interface/order/order";
import getOrderById from "@/api/order/getOrderById.api";
import { useParams } from "next/navigation";
import updateOrderById from "@/api/order/updateOrder.api";
import Loading from "@/components/loading";
import { ErrorContext} from "@/contexts/ErrorContext";
import getUserData from "@/api/auth/getUserData.api";
import { GetUserData } from "@/interface/auth/user";
import ReviewPopup from "../components/ReviewPopup";
import Review from "../components/Review";

export default function UpdateOrderPage() {
  const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [depositorUsername, setDepositorUsername] = useState<string | null>(null);
  const [depositeeUsername, setDepositeeUsername] = useState<string | null>(null);
  const onCloseModal = () => setShowPopup(false);
  const [showPopup, setShowPopup] = useState(false);

  const {setError} = useContext(ErrorContext)

  useEffect(() => {
    fetchOrder()
  }, [id]);

  useEffect(() => {
    if (orderData) {
      getDepositorUsername();
      getDepositeeUsername();
    }
  }, [orderData]);

  
  const fetchOrder = async () => {
    const order = await getOrderById(id);
    if (order.success && order.data.data) {
      setOrderData(order.data.data);
    } else {
      setError(order.error);
    }
  };

  const getDepositorUsername = async() =>{
    if(orderData){
      const depositorData : GetUserData | undefined= await getUserData(orderData.depositor_id)
      if(depositorData){
        setDepositorUsername(depositorData.data.username)
      }
    }
  }

  const getDepositeeUsername = async() =>{
    if(orderData && orderData.depositee_id){
      const depositeeData : GetUserData | undefined= await getUserData(orderData.depositee_id)
      if(depositeeData){
        setDepositeeUsername(depositeeData.data.username)
      }
    }
  }

  const handleReviewButton = async(e : React.FormEvent) =>{
    e.preventDefault()
    setShowPopup(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderData) {
      try {
        const updatedOrder = await updateOrderById(
          id,
          orderData.depositor_id,
          orderData.package_id,
          orderData.package_name,
          orderData.package_description,
          orderData.package_weight,
          orderData.payment_type,
          orderData.payment_amount,
          getNextPackageStatus() ?? orderData.status
        );
        if (updatedOrder.success) {
          window.location.reload();
        } else {
          const errorMessage = updatedOrder.error;
          setError(errorMessage);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMsg =
            error.message ||
            "An unexpected error occurred. Please try again later.";
          setError(errorMsg);
        } else {
          // Handle the case when error is not an instance of Error
          const errorMsg =
            "An unexpected error occurred. Please try again later.";
          setError(errorMsg);
        }
      }
    }
  };

  const getNextPackageStatus = () => {
    if (!orderData?.status) return;

    switch (orderData.status) {
      case "placed":
        return "reserved";
      case "reserved":
        return "received";
      case "received":
        return "completed";
      case "completed":
        return "completed";
      default:
        return "Unknown status";
    }
  };

  const getUpdateButtonText = () => {
    let resultText = "Unknown status";
    switch (orderData?.status) {
      case "placed":
        resultText = "Proceed with reserving the package";
        break;
      case "reserved":
        resultText = "Proceed with receiving the package";
        break;
      case "received":
        resultText = "Complete the package transaction";
        break;
      case "completed":
        resultText = "Package transaction is already completed";
        break;
      default:
        resultText = "Unknown status";
        break;
    }
    return resultText;
  };

  return (
    <div className="w-full flex justify-center bg-amber-100 text-stone-900/80 h-screen p-4 pb-40 md:pb-20">
      <div className="flex w-full h-full p-5 pt-12">
        <Sidebar />
        <div className="flex flex-col w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg overflow-y-scroll">
          {orderData ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {orderData.package_name}
              </h2>
              <div className="space-y-4">
                {/* Package Description */}
                <div>
                  <label
                    htmlFor="package_description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Package Description
                  </label>
                  <textarea
                    id="package_description"
                    value={orderData.package_description}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>

                {/* Payment Amount */}
                <div>
                  <label
                    htmlFor="payment_amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payment Amount
                  </label>
                  <input
                    id="payment_amount"
                    type="number"
                    value={orderData.payment_amount}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>

                {/* Payment Type */}
                <div>
                  <label
                    htmlFor="payment_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payment Type
                  </label>
                  <select
                    id="payment_type"
                    value={orderData.payment_type}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  >
                    <option value="platform">Platform</option>
                  </select>
                </div>

                {/* Package Weight */}
                <div>
                  <label
                    htmlFor="package_weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Package Weight
                  </label>
                  <input
                    id="package_weight"
                    type="number"
                    value={orderData.package_weight}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>

                {/* Depositor ID */}
                <div>
                  <label
                    htmlFor="depositor_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Depositor
                  </label>
                  <input
                    id="depositor_id"
                    type="text"
                    value={depositorUsername ?? 'N/A'}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>

                {/* Depositee ID with Review Button */}
                {orderData.depositee_id ? (
                  <div>
                    <label
                      htmlFor="depositee_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Depositee
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        id="depositee_id"
                        type="text"
                        value={depositeeUsername ?? 'N/A'}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        disabled
                      />
                     {orderData.status && orderData.status === 'completed'? 
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                        onClick={handleReviewButton}
                      >
                        Review
                      </button>
                      : null
                     }
                    </div>
                  </div>
                ) : null}

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <input
                    id="status"
                    type="text"
                    value={orderData.status}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>
                {/* Button at the bottom right */}
                {orderData.status !== "completed" ? (
                  <button
                    onClick={handleSubmit}
                    className="flex align-bottom bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                  >
                    {getUpdateButtonText()}
                  </button>
                ) : null}
              </div>
              {showPopup && orderData.depositee_id && (
              <ReviewPopup onClose={onCloseModal}>
                <Review 
                  onClose={onCloseModal}
                  depositeeId={orderData.depositee_id}
                />
              </ReviewPopup>
        )}
            </>
          ) : (
            <Loading/>
          )}
        </div>
      </div>
    </div>
  );
}
