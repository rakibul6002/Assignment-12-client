import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/Auth/AuthProvider';

export default function AdminProfile() {
  const { user } = useContext(AuthContext);
  const [mealCount, setMealCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchMealCount = async () => {
        try {
          setError(null);
          const res = await fetch(
            `https://your-api-url.com/meals/count?email=${encodeURIComponent(user.email)}`
          );
          if (!res.ok) throw new Error('Failed to fetch meal count');
          const data = await res.json();
          setMealCount(data.count || 0);
        } catch (err) {
          console.error('Failed to fetch meal count:', err);
          setError('Could not load meal count');
        } finally {
          setLoading(false);
        }
      };

      fetchMealCount();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
          alt={`${user?.displayName || 'Admin'} profile photo`}
          className="w-28 h-28 rounded-full border-4 border-indigo-300"
        />
        <h2 className="text-2xl font-bold mt-4 text-indigo-700">{user?.displayName || 'Admin'}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="mt-6 text-center">
        {error ? (
          <p className="text-red-500 font-semibold">{error}</p>
        ) : (
          <h3 className="text-xl font-semibold text-gray-800">
            Meals Added: <span className="text-indigo-600">{mealCount}</span>
          </h3>
        )}
      </div>
    </div>
  );
}
