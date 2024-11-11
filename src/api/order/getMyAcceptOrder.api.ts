import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function getMyAcceptedOrders() {
  try {
    const response = await fetch(`${API_URL}/order/accept`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching my accepted order:", error);
  }
}
