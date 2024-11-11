import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function createOrder(
  package_name: string,
  package_description: string,
  package_weight: number,
  payment_type: string,
  payment_amount: number
) {
  try {
    const response = await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        package_name: package_name,
        package_description: package_description,
        package_weight: package_weight,
        payment_type: payment_type,
        payment_amount: payment_amount,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error create order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error create order`, error);
    return null;
  }
}
