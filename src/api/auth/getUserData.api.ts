/* eslint-disable @typescript-eslint/no-unused-vars */
import { GATE_WAY_URL } from "@/config/config";
import { GetUserData } from "@/interface/auth/user";
import { toast } from "react-toastify";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function getUserData(userId : string) : Promise<GetUserData | undefined> {
  try {
    const response = await fetch(`${API_URL}/auth/info/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    toast.error(`Error fetching user id : ${userId}`);
  }
}
