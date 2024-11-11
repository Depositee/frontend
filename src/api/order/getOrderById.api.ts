import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function getOrderById(id: string) {
  try {
    const response = await fetch(`${API_URL}/order/my/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
  }
}
