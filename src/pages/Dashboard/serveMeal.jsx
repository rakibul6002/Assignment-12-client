import React, { useEffect, useState } from 'react';

export default function ServeMeal() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = search
        ? `https://your-api-url.com/requested-meals?search=${encodeURIComponent(search)}`
        : 'https://your-api-url.com/requested-meals';

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch requested meals');
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [search]);

  const handleServe = async (mealId) => {
    if (!window.confirm('Mark this meal as delivered?')) return;

    try {
      const res = await fetch(`https://your-api-url.com/requested-meals/${mealId}/serve`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to update meal status');
      alert('Meal status updated to delivered');
      fetchMeals();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className=" p-6 bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 text-center tracking-wide">
        🍽️ Serve Meals
      </h1>

      <input
        type="text"
        placeholder="Search by user name or email..."
        className="w-full max-w-md mx-auto mb-8 block px-5 py-3 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-shadow shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="text-center text-purple-500 font-semibold">Loading meals...</p>}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-100 rounded-t-lg">
              <tr>
                <th className="px-6 py-3 text-left text-purple-700 font-semibold tracking-wide">
                  Meal Title
                </th>
                <th className="px-6 py-3 text-left text-purple-700 font-semibold tracking-wide">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-purple-700 font-semibold tracking-wide">
                  User Name
                </th>
                <th className="px-6 py-3 text-center text-purple-700 font-semibold tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-purple-700 font-semibold tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {meals.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500 italic font-semibold"
                  >
                    No requested meals found.
                  </td>
                </tr>
              ) : (
                meals.map((meal) => (
                  <tr
                    key={meal._id || meal.id}
                    className="border-b border-purple-100 hover:bg-purple-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-purple-800">{meal.title}</td>
                    <td className="px-6 py-4 text-purple-700">{meal.userEmail}</td>
                    <td className="px-6 py-4 text-purple-700">{meal.userName}</td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {meal.status === 'delivered' ? (
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm select-none">
                          Delivered
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm select-none">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {meal.status !== 'delivered' ? (
                        <button
                          onClick={() => handleServe(meal._id || meal.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full px-5 py-2 shadow-lg transition-transform active:scale-95"
                        >
                          Serve
                        </button>
                      ) : (
                        <span className="text-green-700 font-semibold">✓</span>
                      )}
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
