import React, { useEffect, useState } from 'react';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://your-api-url.com/reviews'); // Replace with your API endpoint
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    setLoading(true); // Disable buttons during deletion
    try {
      const res = await fetch(`https://your-api-url.com/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete review');
      alert('Review deleted successfully');
      fetchReviews();
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Reviews</h1>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2 text-left">Meal Title</th>
                <th className="border px-4 py-2 text-right">Likes</th>
                <th className="border px-4 py-2 text-right">Reviews Count</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 font-semibold text-gray-600">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review._id || review.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{review.mealTitle}</td>
                    <td className="border px-4 py-2 text-right">{review.likes}</td>
                    <td className="border px-4 py-2 text-right">{review.reviews_count}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => alert(`View meal: ${review.mealTitle}`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        disabled={loading}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(review._id || review.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        disabled={loading}
                      >
                        Delete
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
