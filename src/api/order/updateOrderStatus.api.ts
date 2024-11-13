import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function updateOrderStatus(
  orderId: number,
  status: string
) {
  try {
    const response = await fetch(`${API_URL}/order/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Error update order status: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error update order status`, error);
    return null;
  }
}
