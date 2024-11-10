import { GATE_WAY_PORT, GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}:${GATE_WAY_PORT}`;
console.log(GATE_WAY_URL, GATE_WAY_PORT);

export default async function getCurrentUser() {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
