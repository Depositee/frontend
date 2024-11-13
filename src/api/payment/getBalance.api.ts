import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function getBalance(userId: string) {
  try {
    const response = await fetch(`${API_URL}/payment/get_balance/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error get balance: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error get balance`, error);
    return null;
  }
}
