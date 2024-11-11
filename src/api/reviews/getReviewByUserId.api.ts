/* eslint-disable @typescript-eslint/no-unused-vars */
import { GATE_WAY_URL } from "@/config/config";
import { Review } from "@/interface/review/review";
const API_URL = `http://${GATE_WAY_URL}`;

export default async function getReviewByUserId(
  userId : string,
) : Promise<Review[] | undefined> {
  try {
    const response = await fetch(`${API_URL}/reviews/depositee/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Error get review: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error get review for userId ${userId}`);
  }
}
