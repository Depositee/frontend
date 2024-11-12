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
    <div className="w-100vw justify-center flex bg-amber-100 text-stone-900/80 h-dvh w-dvw p-4 pb-40 md:pb-24">
        <div className="flex w-full h-full p-2 pt-12">
            <div className=" max-w-[48rem] mx-auto p-4 w-full overflow-auto">
                {/* User Profile Section */}
                {userProfile && (
                    <div className="mb-8 p-4 bg-white pinkmodal">
                    <h2 className="text-3xl font-bold text-stone-800 mb-4">@{userProfile.username}</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">{userProfile.firstName} {userProfile.lastName}</span></p>
                        <p><span className="font-medium">Room </span> {userProfile.roomNumber}</p>
                        <p><span className="font-medium">Phone: </span> {userProfile.phoneNumber}</p>
                    </div>
                    </div>
                )}

                {/* Reviews Table Section */}
                <div className="p-4 bg-white pinkmodal">
                    <h2 className="text-2xl font-semibold text-stone-800 mb-4">Reviews</h2>
                  
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b-2 p-4">
                          
                          <div className="text-gray-700 flex items-center justify-start gap-2">
                            <span className="inline-flex justify-start md:items-center gap-2 flex-col md:flex-row"><RatingStar count={review.rating}/> 
                            <span className="hidden md:inline-block">on
                              </span> {" "}
                            <span className="font-bold inline-block">{new Date(review.created_at).toLocaleDateString()}</span>
                          </span></div>

                            <div className="py-2 text-gray-700">{review.review_text}</div>
                        </div>
                        ))}
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

function RatingStar({count}:{count:number}){
  return(
    <span className="flex h-8 fill-amber-500">
      {[...Array(count)].map((as, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
      ))}
    </span>
  );
}

export default UserProfilePage;
