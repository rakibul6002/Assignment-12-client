import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/Auth/AuthProvider";

export default function AddMeal() {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  // Fetch user data by email from backend API
  useEffect(() => {
    async function fetchUserData() {
      if (!user?.email) return;

      try {
        setLoadingUser(true);
        const res = await fetch(`http://localhost:5000/users/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setNewUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setNewUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!newUser) {
      Swal.fire({
        icon: "error",
        title: "User data missing",
        text: "Cannot submit meal without user data.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("ingredients", form.ingredients.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("category", form.category.value);
    formData.append("post_time", new Date().toISOString());
    formData.append("distributor_name", newUser.displayName || newUser.name || "Unknown");
    formData.append("distributor_email", newUser.email);
    formData.append("image", form.image.files[0]);

    try {
      setLoadingSubmit(true);
      const res = await fetch("http://localhost:5000/meals", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      if (res.ok && result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Meal Added!",
          text: "Your meal was added successfully 💖",
        });
        form.reset();
        navigate("/dashboard/manage-meals");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: result.error || "Failed to add meal 😓",
        });
      }
    } catch (error) {
      console.error("Add meal error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingUser) {
    return <div className="text-center py-20">Loading user data...</div>;
  }

  if (!newUser) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load user data. Please refresh or try again later.
      </div>
    );
  }

 return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-pink-500 mb-10 drop-shadow-sm">
        🍱 Share Your Yummy Meal!
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 shadow-2xl rounded-3xl p-10 space-y-6 transition-all"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">🍽️ Meal Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Ex: Spicy Chicken Curry"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">🥗 Ingredients</label>
          <input
            type="text"
            name="ingredients"
            required
            placeholder="Ex: Rice, Chicken, Spices"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">📝 Description</label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Describe your meal..."
            className="textarea textarea-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">💰 Price (৳)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            required
            placeholder="Ex: 120"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">📂 Category</label>
          <select
            name="category"
            required
            className="select select-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-pink-300"
          >
            <option value="">Select category</option>
            <option value="breakfast">🥞 Breakfast</option>
            <option value="lunch">🍛 Lunch</option>
            <option value="dinner">🍲 Dinner</option>
            <option value="snacks">🍪 Snacks</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">📸 Meal Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full rounded-xl shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loadingSubmit}
          className="btn w-full rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold hover:brightness-110 hover:scale-[1.01] transition-all duration-300"
        >
          {loadingSubmit ? "Uploading..." : "Add Meal 🍴"}
        </button>
      </form>
    </div>
  );
}
