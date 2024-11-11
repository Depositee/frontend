import { GATE_WAY_URL } from "@/config/config";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function createReview(
  depositeeId : string,
  rating : number,
  reviewText? : string 
) {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        depositeeId : depositeeId,
        rating : rating,
        reviewText : reviewText 
      }),
    });

    if (!response.ok) {
      throw new Error(`Error create review: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error create review`, error);
    return null;
  }
}
