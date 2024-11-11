import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GATE_WAY_URL } from "@/config/config";

export default async function login(email: string, password: string) {
  const API_URL = `http://${GATE_WAY_URL}/auth/login`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });
  if (response.ok) {
    toast.success("Login Success");
    const data = await response.json();
    setCookie("auth", data?.token);
    return data;
  } else {
    toast.error("Incorrect username/password\nor Account does not exist");
  }
}
