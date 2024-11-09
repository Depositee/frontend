import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function logout() {
    deleteCookie("auth");
    console.log("logout")
    toast.success("Logged out successfully");
}
