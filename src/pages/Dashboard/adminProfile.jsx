import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/Auth/AuthProvider";

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
            `http://localhost:5000/meals/meel/${encodeURIComponent(user.email)}`
          );
          if (!res.ok) throw new Error("Failed to fetch meal count");
          const data = await res.json();
          setMealCount(data.length || 0);
        } catch (err) {
          console.error("Failed to fetch meal count:", err);
          setError("Could not load meal count");
        } finally {
          setLoading(false);
        }
      };

      fetchMealCount();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <p className="text-lg font-semibold text-indigo-600 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative bg-white bg-opacity-90 backdrop-blur-md max-w-sm w-full rounded-3xl shadow-2xl border border-pink-200 p-8 flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
          alt={`${user?.displayName || "Admin"} profile photo`}
          className="w-32 h-32 rounded-full border-8 border-indigo-400 shadow-lg object-cover"
        />

        <h2 className="text-3xl font-extrabold mt-6 text-indigo-700 drop-shadow-sm">
          {user?.displayName || "Admin"}
        </h2>

        <p className="text-indigo-500 mt-2 tracking-wide font-medium">{user?.email}</p>

        <div className="mt-10 w-full text-center">
          {error ? (
            <p className="text-red-500 font-semibold">{error}</p>
          ) : (
            <h3 className="text-2xl font-semibold text-indigo-600">
              Meals Added:{" "}
              <span className="inline-block bg-pink-200 text-pink-800 rounded-full px-4 py-1 shadow-md">
                {mealCount}
              </span>
            </h3>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-indigo-400 font-light text-sm select-none">
        © {new Date().getFullYear()} Coding Care - Hostel Management
      </footer>
    </div>
  );
}
