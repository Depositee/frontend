"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { Order } from "@/interface/order/order";
import getOrderById from "@/api/order/getOrderById.api";
import { useParams } from "next/navigation";
import updateOrderById from "@/api/order/updateOrder.api";

export default function UpdateOrderPage() {
  const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrderById(id);
      if (order.success && order.data.data) {
        setOrderData(order.data.data);
      } else {
        setErrorMessage(order.error);
      }
    };

    fetchOrder();
  }, [id]);

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
          setErrorMessage(errorMessage);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMsg =
            error.message ||
            "An unexpected error occurred. Please try again later.";
          setErrorMessage(errorMsg);
        } else {
          // Handle the case when error is not an instance of Error
          const errorMsg =
            "An unexpected error occurred. Please try again later.";
          setErrorMessage(errorMsg);
        }
        // const errorMsg =
        //   error?.message ||
        //   "An unexpected error occurred. Please try again later.";
        // setErrorMessage(errorMsg);
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
          {/* Show error message if there is one */}

          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
          {orderData ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {orderData.package_name}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Depositor ID
                  </label>
                  <input
                    id="depositor_id"
                    type="text"
                    value={orderData.depositor_id}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                    disabled
                  />
                </div>

                {/* Depositee ID */}
                {orderData.depositee_id ? (
                  <div>
                    <label
                      htmlFor="depositee_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Depositee ID
                    </label>
                    <input
                      id="depositee_id"
                      type="text"
                      value={orderData.depositee_id}
                      className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-600"
                      disabled
                    />
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
              </form>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
