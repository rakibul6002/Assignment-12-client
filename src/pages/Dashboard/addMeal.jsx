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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        🍽️ Add a Delicious Meal
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Meal Title</label>
          <input
            type="text"
            name="title"
            required
            className="input input-bordered w-full rounded-xl"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            required
            className="input input-bordered w-full rounded-xl"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={3}
            className="textarea textarea-bordered w-full rounded-xl"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price (৳)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            required
            className="input input-bordered w-full rounded-xl"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            required
            className="select select-bordered w-full rounded-xl"
          >
            <option value="">Select category</option>
            <option value="breakfast">🥞 Breakfast</option>
            <option value="lunch">🍛 Lunch</option>
            <option value="dinner">🍲 Dinner</option>
            <option value="snacks">🍪 Snacks</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Meal Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full rounded-xl"
          />
        </div>

        <button
          type="submit"
          disabled={loadingSubmit}
          className="btn bg-pink-500 text-white w-full hover:bg-pink-600 rounded-xl transition duration-300"
        >
          {loadingSubmit ? "Uploading..." : "Add Meal 🍴"}
        </button>
      </form>
    </div>
  );
}
