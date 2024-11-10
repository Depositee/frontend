import { toast } from "react-toastify";

const API_URL = 'http://localhost:8081'
export default async function register(
    username : string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roomNumber: string,
) {
    const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username : username,
            email: email,
            password: password,
            firstName : firstName,
            lastName : lastName,
            phoneNumber : phoneNumber,
            roomNumber : roomNumber
        }),
    });
    if (response.ok) {
        const data = await response.json()
        return data;

    } else {
        toast.error('Invalid register data please check');
        console.error("Register failed");
    }


    
}