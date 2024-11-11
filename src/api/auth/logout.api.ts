import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import { GATE_WAY_URL } from "@/config/config";
import "react-toastify/dist/ReactToastify.css";

export default async function logout() {
  const API_URL = `http://${GATE_WAY_URL}/auth/logout`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log(response, "response");
  deleteCookie("auth");
  console.log("logout");
  toast.success("Logged out successfully");
}
