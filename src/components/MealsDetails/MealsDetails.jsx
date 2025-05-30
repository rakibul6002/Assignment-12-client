import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/Auth/AuthProvider';

export default function MealsDetails() {
  const { id: mealId } = useParams();
  const { user } = useContext(AuthContext);

  const meal = useLoaderData();

  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Initialize state after meal data loads
  useEffect(() => {
    if (meal) {
      setLikes(meal.likes || 0);
      setReviews(meal.reviews || []);
      setUserLiked(user?.email ? meal.likedBy?.includes(user.email) : false);
      setLoading(false);
    }
  }, [meal, user]);

  async function handleLike() {
    if (!user?.email) {
      Swal.fire('Please Login', 'You must be logged in to like a meal.', 'info');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/meals/like/${mealId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email }),
      });
      if (!res.ok) throw new Error('Failed to like meal');
      const updatedMeal = await res.json();
      setLikes(updatedMeal.likes);
      setUserLiked(true);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not like the meal.', 'error');
    }
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire('Please Login', 'You must be logged in to submit a review.', 'info');
      return;
    }
    if (!reviewText.trim()) {
      Swal.fire('Empty Review', 'Please write something before submitting.', 'warning');
      return;
    }
    setSubmittingReview(true);
    try {
      const reviewData = {
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        review: reviewText.trim(),
        date: new Date().toISOString(),
      };
      const res = await fetch(`http://localhost:5000/meals/review/${mealId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const updatedMeal = await res.json();
      setReviews(updatedMeal.reviews);
      setReviewText('');
      Swal.fire('Success', 'Review submitted!', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not submit review.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold text-gray-700">
        Loading meal details...
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="p-10 text-center text-red-600 font-bold text-xl">
        Meal not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-pink-600">{meal.title}</h1>

      <img
        src={meal.image}
        alt={meal.title}
        className="w-full max-w-xl mx-auto rounded-lg shadow-lg object-cover"
        style={{ maxHeight: '400px' }}
      />

      <p className="text-gray-700 text-lg whitespace-pre-line">{meal.description}</p>

      <p className="text-xl font-semibold text-pink-700">Price: ৳{meal.price}</p>

      <button
        onClick={handleLike}
        disabled={userLiked}
        className={`px-5 py-2 rounded-full font-semibold text-white transition ${
          userLiked ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
        }`}
        aria-label="Like this meal"
      >
        ❤️ Like {likes > 0 ? `(${likes})` : ''}
      </button>

      <hr className="my-6" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 mb-6">No reviews yet.</p>
        ) : (
          <ul className="space-y-4 mb-6 max-h-72 overflow-y-auto">
            {reviews.map((r, idx) => (
              <li
                key={idx}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50"
              >
                <p className="text-gray-800">
                  <strong>{r.userName}</strong>{' '}
                  <span className="text-gray-500 text-sm">
                    ({new Date(r.date).toLocaleDateString()})
                  </span>
                </p>
                <p className="mt-1 text-gray-700">{r.review}</p>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <label htmlFor="reviewText" className="block font-semibold">
            Write Your Review:
          </label>
          <textarea
            id="reviewText"
            placeholder="Share your thoughts about this meal..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={5}
            disabled={submittingReview}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            disabled={submittingReview}
            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </section>
    </div>
  );
}
