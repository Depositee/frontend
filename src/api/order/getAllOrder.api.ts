const API_URL = 'http://localhost:8081'

export default async function getAllOrders(){
  try {
    const response = await fetch(`${API_URL}/order`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
    });
    return await response.json()
  } catch (error) {
      console.error("Error fetching my:", error)
  }
}
