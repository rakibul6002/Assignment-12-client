import React, { useEffect, useState } from 'react';

export default function RequestedMeal() {
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequestedMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://your-api-url.com/requested-meals'); // Replace with real API
      if (!res.ok) throw new Error('Failed to fetch requested meals');
      const data = await res.json();
      setRequestedMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (mealId) => {
    const confirm = window.confirm('Are you sure you want to cancel this request?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://your-api-url.com/requested-meals/${mealId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to cancel meal request');
      alert('Meal request cancelled successfully');
      fetchRequestedMeals();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchRequestedMeals();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Requested Meals</h1>

      {loading && <p>Loading requested meals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2 text-left">Meal Title</th>
                <th className="border px-4 py-2 text-right">Likes</th>
                <th className="border px-4 py-2 text-right">Reviews</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedMeals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 font-semibold text-gray-600">
                    No requested meals found.
                  </td>
                </tr>
              ) : (
                requestedMeals.map((meal) => (
                  <tr key={meal._id || meal.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{meal.title}</td>
                    <td className="border px-4 py-2 text-right">{meal.likes}</td>
                    <td className="border px-4 py-2 text-right">{meal.reviews_count}</td>
                    <td className="border px-4 py-2 text-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {meal.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleCancel(meal._id || meal.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
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
