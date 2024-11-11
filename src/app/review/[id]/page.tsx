"use client"
import getUserData from "@/api/auth/getUserData.api";
import getReviewByUserId from "@/api/reviews/getReviewByUserId.api";
import Sidebar from "@/components/sidebar";
import { GetUserData, UserData } from "@/interface/auth/user";
import { Review } from "@/interface/review/review";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      fetchUserProfile();
      fetchUserReviews();
    }
  }, [id]);

  const fetchUserProfile = async () => {
    const userData : GetUserData | undefined = await getUserData(id)
    if(userData){
        setUserProfile(userData.data)
    }
  };

  const fetchUserReviews = async () => {
    const userReviews : Review[] = await getReviewByUserId(id) ?? []
    setReviews(userReviews)
  };

  return (
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-2">
        <div className="flex w-full h-full p-5 pt-12">
            <div className="max-w-4xl mx-auto p-4">
                {/* User Profile Section */}
                {userProfile && (
                    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Username:</span> {userProfile.username}</p>
                        <p><span className="font-medium">First Name:</span> {userProfile.firstName}</p>
                        <p><span className="font-medium">Last Name:</span> {userProfile.lastName}</p>
                        <p><span className="font-medium">Room Number:</span> {userProfile.roomNumber}</p>
                        <p><span className="font-medium">Telephone Number:</span> {userProfile.phoneNumber}</p>
                    </div>
                    </div>
                )}

                {/* Reviews Table Section */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
                    <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="p-2 border-b font-medium text-left text-gray-700">Date</th>
                        <th className="p-2 border-b font-medium text-left text-gray-700">Rating</th>
                        <th className="p-2 border-b font-medium text-left text-gray-700">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                        <tr key={review.id} className="even:bg-gray-50">
                            <td className="p-2 border-b text-gray-700">{new Date(review.created_at).toLocaleDateString()}</td>
                            <td className="p-2 border-b text-gray-700">{review.rating}</td>
                            <td className="p-2 border-b text-gray-700">{review.review_text}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    {reviews.length === 0 && (
                    <p className="text-gray-500 mt-4">No reviews available.</p>
                    )}
                </div>
            </div>
            <Sidebar />
        </div>
    </div>
  );
};

export default UserProfilePage;
