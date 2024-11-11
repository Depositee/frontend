import { useState } from "react";

interface ReviewProps {
    onClose: () => void;
  }

const Review = (props : ReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
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
  
  const handleSubmit = () =>{
    closePopup()
  }

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Rate Your Experience</h2>
      
      {/* Star Rating */}
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= (hoverRating || rating) ? "gold" : "gray"}
            className="w-8 h-8 cursor-pointer transition duration-200 transform hover:scale-110"
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
        Your Rating: <span className="font-bold text-gray-800">{rating}</span>
      </p>

      {/* Submit Button */}
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default Review;
