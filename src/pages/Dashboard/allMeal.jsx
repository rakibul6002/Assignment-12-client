import React, { useEffect, useState } from 'react';

export default function AllMeal() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(''); // 'likes' or 'reviews_count' or ''
  const [order, setOrder] = useState('desc'); // 'asc' or 'desc'
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    let url = 'https://your-api-url.com/meals'; // Replace with your actual API URL
    if (sortBy) {
      url += `?sortBy=${sortBy}&order=${order}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch meals');
      }
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
  }, [sortBy, order]);

  const handleDelete = async (mealId) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;

    try {
      const res = await fetch(`https://your-api-url.com/meals/${mealId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete meal');
      alert('Meal deleted successfully');
      fetchMeals(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      // toggle order
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('desc');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Meals</h1>

      <div className="mb-4 flex justify-end gap-4">
        <button
          onClick={() => handleSortChange('likes')}
          className={`px-4 py-2 rounded ${
            sortBy === 'likes' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Sort by Likes {sortBy === 'likes' ? (order === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button
          onClick={() => handleSortChange('reviews_count')}
          className={`px-4 py-2 rounded ${
            sortBy === 'reviews_count' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Sort by Reviews {sortBy === 'reviews_count' ? (order === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>

      {loading && <p>Loading meals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-right">Likes</th>
                <th className="border px-4 py-2 text-right">Reviews</th>
                <th className="border px-4 py-2 text-right">Rating</th>
                <th className="border px-4 py-2 text-left">Distributor</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 font-semibold text-gray-600">
                    No data found.
                  </td>
                </tr>
              ) : (
                meals.map((meal) => (
                  <tr key={meal._id || meal.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{meal.title}</td>
                    <td className="border px-4 py-2 text-right">{meal.likes}</td>
                    <td className="border px-4 py-2 text-right">{meal.reviews_count}</td>
                    <td className="border px-4 py-2 text-right">{meal.rating.toFixed(1)}</td>
                    <td className="border px-4 py-2">{meal.distributorName}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => alert(`View meal: ${meal.title}`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => alert(`Update meal: ${meal.title}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(meal._id || meal.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
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
