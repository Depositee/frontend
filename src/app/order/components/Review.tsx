import createReview from "@/api/reviews/createReview.api";
import { useState } from "react";

interface ReviewProps {
    depositeeId : string;
    onClose: () => void;
}

const Review = (props : ReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const closePopup = props.onClose

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleSubmit = async() =>{
    await createReview(
      props.depositeeId,
      rating,
      reviewText
    )
    closePopup()
  }

  const ratingScore = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Rate Your Experience</h2>
      
      {/* Star Rating */}
      <div className="flex space-x-2">
        {ratingScore.map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-8 h-8 cursor-pointer squishy-click ${
              star <= (hoverRating || rating) ? "fill-amber-500" : "fill-gray-400"
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Display Selected Rating */}
      <p className="text-lg text-gray-600">
        Your Rating: <span className="font-bold text-gray-800">{rating}★</span>
      </p>
      {/* Review Text Input */}
      <div className="w-full">
        <label
          htmlFor="reviewText"
          className="block text-sm font-medium text-gray-700"
        >
          Your Review:
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="w-full p-2 mt-1 border-2 rounded-none border-stone-400 focus:border-amber-400 resize-none outline-none"
          placeholder="Write your review here..."
        />
      </div>

      {/* Submit Button */}
      <button
        className="amberbtn font-bold"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default Review;
