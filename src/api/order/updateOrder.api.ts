import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function updateOrderById(
  id: string,
  depositorId: string,
  package_id: string,
  package_name: string,
  package_description: string,
  package_weight: number,
  payment_type: string,
  payment_amount: number,
  status: string
) {
  try {
    const response = await fetch(`${API_URL}/order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        depositorId: depositorId,
        package_id: package_id,
        package_name: package_name,
        package_description: package_description,
        package_weight: package_weight,
        payment_type: payment_type,
        payment_amount: payment_amount,
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating order: ${response.statusText}`);
    }
    return await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
      throw new Error(`Error updating order with id ${id}`)
  }
}
