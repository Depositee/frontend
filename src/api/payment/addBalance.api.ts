import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function addBalance(userId: string, amount: number) {
  try {
    const response = await fetch(`${API_URL}/payment/add_balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, amount, currency: "THB" }),
    });

    if (!response.ok) {
      throw new Error(`Error add balance: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error add balance`, error);
    return null;
  }
}
