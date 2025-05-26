import React, { useEffect, useState } from 'react';

export default function UpcomingMeal() {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    title: '',
    description: '',
    likes: 0,
    image: '',
  });

  // Fetch upcoming meals and sort by likes descending
  const fetchUpcomingMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://your-api-url.com/upcoming-meals');
      if (!res.ok) throw new Error('Failed to fetch upcoming meals');
      let data = await res.json();
      data.sort((a, b) => b.likes - a.likes);
      setUpcomingMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMeals();
  }, []);

  // Publish meal handler
  const handlePublish = async (mealId) => {
    if (!window.confirm('Publish this meal to main collection?')) return;

    try {
      const res = await fetch(`https://your-api-url.com/upcoming-meals/${mealId}/publish`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to publish meal');
      alert('Meal published successfully!');
      fetchUpcomingMeals();
    } catch (err) {
      alert(err.message);
    }
  };

  // Add upcoming meal modal handlers
  const handleNewMealChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUpcomingMeal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://your-api-url.com/upcoming-meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      });
      if (!res.ok) throw new Error('Failed to add upcoming meal');
      alert('Upcoming meal added!');
      setShowModal(false);
      setNewMeal({ title: '', description: '', likes: 0, image: '' });
      fetchUpcomingMeals();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-yellow-50 to-pink-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-pink-700 text-center tracking-wide">
        🍲 Upcoming Meals
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow-md transition-transform active:scale-95"
        >
          + Add Upcoming Meal
        </button>
      </div>

      {loading && <p className="text-center text-pink-500 font-semibold">Loading upcoming meals...</p>}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-pink-100 rounded-t-lg">
              <tr>
                <th className="px-6 py-3 text-left text-pink-700 font-semibold tracking-wide">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-pink-700 font-semibold tracking-wide">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-pink-700 font-semibold tracking-wide">
                  Likes
                </th>
                <th className="px-6 py-3 text-center text-pink-700 font-semibold tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingMeals.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-8 text-gray-500 italic font-semibold"
                  >
                    No upcoming meals found.
                  </td>
                </tr>
              ) : (
                upcomingMeals.map((meal) => (
                  <tr
                    key={meal._id || meal.id}
                    className="border-b border-pink-100 hover:bg-pink-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-pink-800">{meal.title}</td>
                    <td className="px-6 py-4 text-pink-700 truncate max-w-xs">{meal.description}</td>
                    <td className="px-6 py-4 text-center font-semibold text-pink-600">{meal.likes}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handlePublish(meal._id || meal.id)}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full px-5 py-2 shadow-lg transition-transform active:scale-95"
                      >
                        Publish
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative">
            <h2 className="text-2xl font-bold mb-6 text-pink-700">Add Upcoming Meal</h2>

            <form onSubmit={handleAddUpcomingMeal} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-pink-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMeal.title}
                  onChange={handleNewMealChange}
                  required
                  className="w-full border border-pink-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Meal title"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-pink-700">Description</label>
                <textarea
                  name="description"
                  value={newMeal.description}
                  onChange={handleNewMealChange}
                  required
                  className="w-full border border-pink-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows={3}
                  placeholder="Describe the meal..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-pink-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newMeal.image}
                  onChange={handleNewMealChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-pink-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-full border border-pink-400 text-pink-600 hover:bg-pink-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2 font-semibold transition-transform active:scale-95"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
