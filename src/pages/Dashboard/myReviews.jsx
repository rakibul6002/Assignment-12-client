import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/Auth/AuthProvider';

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyReviews = async () => {
    if (!user?.email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://your-api-url.com/reviews?email=${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch your reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`https://your-api-url.com/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete review');
      alert('Review deleted successfully');
      fetchMyReviews();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (reviewId) => {
    alert(`Navigate to edit page for review ID: ${reviewId}`);
    // Optionally navigate to edit page using router
  };

  const handleViewMeal = (mealId) => {
    alert(`View details of meal ID: ${mealId}`);
    // Optionally navigate to meal details page
  };

  useEffect(() => {
    fetchMyReviews();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">My Reviews</h1>

      {loading && <p>Loading your reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2 text-left">Meal Title</th>
                <th className="border px-4 py-2 text-right">Likes</th>
                <th className="border px-4 py-2 text-left">Review</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 font-semibold text-gray-600">
                    You haven’t added any reviews yet.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review._id || review.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{review.mealTitle}</td>
                    <td className="border px-4 py-2 text-right">{review.likes}</td>
                    <td className="border px-4 py-2">{review.text}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(review._id || review.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id || review.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewMeal(review.mealId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View Meal
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
