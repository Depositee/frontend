import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GATE_WAY_PORT, GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}:${GATE_WAY_PORT}`;
export default async function login(email: string, password: string) {
  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (response.ok) {
    toast.success("Login Success");
    const data = await response.json();
    setCookie("auth", data?.token);
    return data;
  } else {
    toast.error("Incorrect username/password\nor Account does not exist");
    console.error("Login failed");
  }
}
