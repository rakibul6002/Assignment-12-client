import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaEye, FaEdit, FaTrash, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function AllMeal() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('desc');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
console.log('====================================');
console.log(meals);
console.log('====================================');
  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    let url = 'http://localhost:5000/meals';
    if (sortBy) {
      url += `?sortBy=${sortBy}&order=${order}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch meals');
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/meals/${mealId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete meal');
        Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
        fetchMeals();
      } catch (err) {
        Swal.fire('Error!', err.message, 'error');
      }
    }
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('desc');
    }
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return order === 'asc' ? (
      <FaSortUp className="inline ml-1 text-pink-500" />
    ) : (
      <FaSortDown className="inline ml-1 text-pink-500" />
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-pink-600 text-center">🍽️ All Meals</h1>

      {loading && <p className="text-center text-lg text-gray-600 mb-4">Loading meals...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="py-3 px-4 text-left rounded-tl-lg">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th
                className="py-3 px-4 text-right cursor-pointer select-none"
                onClick={() => handleSortChange('likes')}
                title="Sort by Likes"
              >
                Likes {renderSortIcon('likes')}
              </th>
              <th
                className="py-3 px-4 text-right cursor-pointer select-none"
                onClick={() => handleSortChange('reviews_count')}
                title="Sort by Reviews"
              >
                Reviews {renderSortIcon('reviews_count')}
              </th>
              <th className="py-3 px-4 text-right">Rating</th>
              <th className="py-3 px-4 text-left">Distributor</th>
              <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.length === 0 && !loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500 font-medium">
                  No meals found.
                </td>
              </tr>
            ) : (
              meals.map((meal) => (
                <tr
                  key={meal._id}
                  className="border-b last:border-b-0 hover:bg-pink-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">
                    <img
                      src={meal.image || 'https://via.placeholder.com/60'}
                      alt={meal.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">{meal.title}</td>
                  <td className="py-3 px-4 text-right text-pink-600 font-semibold flex justify-end items-center gap-1">
                    <FaHeart /> {meal.likes}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 font-medium">💬 {meal.reviews_count}</td>
                  <td className="py-3 px-4 text-right text-yellow-500 font-semibold flex justify-end items-center gap-1">
                    <FaStar /> {meal.rating?.toFixed(1) || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{meal.distributor_name || 'Unknown'}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/dashboard/viewMeal/${meal._id}`)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 transition"
                      title="View Meal"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/updateMeal/${meal._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 transition"
                      title="Update Meal"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 transition"
                      title="Delete Meal"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
