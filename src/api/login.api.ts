import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8081'
export default async function login(
    email: string,
    password: string
) {
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
        // Login successful
        toast.success('Login Success')
        const data = await response.json()
        setCookie("token",data?.token);
        return data;

    } else {
        // Login failed
        toast('Incorrect username/password\nor Account does not exist');
        console.error("Login failed");
    }


    
}