"use client";
import { useState } from "react";
import createOrder from "@/api/order/createOrder.api";

interface CreateOrderFormProps{
    onClose : () => void
}
export default function CreateOrderForm(props : CreateOrderFormProps) {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packageWeight, setPackageWeight] = useState<number | "">("");
  const [paymentType, setPaymentType] = useState("platform");
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const closePopup = props.onClose

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!packageName || !packageDescription || !packageWeight || !paymentAmount) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const newOrder = await createOrder(
        packageName,
        packageDescription,
        Number(packageWeight),
        paymentType,
        Number(paymentAmount)
      );

      if (newOrder) {
        setSuccessMessage("Order created successfully!");
        setErrorMessage(null);
        setPackageName("");
        setPackageDescription("");
        setPackageWeight("");
        setPaymentAmount("");
        closePopup()
        window.location.reload()
      } else {
        setErrorMessage("Failed to create order.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the order.");
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="mx-8">Package Name</label>
        <input
          type="text"
          placeholder="e.g., EMS, Registered Mail, a big box"
          className="p-2 border-2 border-amber-400 lg:mx-8"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />

        <label className="mx-8">Package Description</label>
        <input
          type="text"
          placeholder="Description of the package"
          className="p-2 border-2 border-amber-400 lg:mx-8"
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
        />

        <label className="mx-8">Package Weight (kg)</label>
        <input
          type="number"
          placeholder="Weight of the package"
          className="p-2 border-2 border-amber-400 lg:mx-8"
          value={packageWeight}
          onChange={(e) => setPackageWeight(e.target.value ? Number(e.target.value) : "")}
        />

        <label className="mx-8">Payment Amount</label>
        <input
          type="number"
          placeholder="Payment amount"
          className="p-2 border-2 border-amber-400 lg:mx-8"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value ? Number(e.target.value) : "")}
        />

        <button type="submit" className="p-2 amberbtn font-bold">
          Create Order
        </button>

        {errorMessage && <p className="text-red-500 mx-8">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mx-8">{successMessage}</p>}
      </form>
    </>
  );
}
