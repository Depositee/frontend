const API_URL = 'http://localhost:8081';

export default async function getCurrentUser(){
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
        });
        return await response.json()
    } catch (error) {
        console.error("Error fetching current user:", error)
    }
}
