import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY'; // Replace with your ImageBB API key

export default function AddMeal({ distributorName, distributorEmail }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert('Please upload an image before submitting.');
      return;
    }

    const mealData = {
      ...data,
      image: imageUrl,
      distributorName,
      distributorEmail,
      rating: 0,
      likes: 0,
      reviews_count: 0,
      postTime: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://your-api-url.com/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
      });

      if (res.ok) {
        alert('Meal added successfully!');
        reset();
        setImageUrl('');
      } else {
        alert('Failed to add meal.');
      }
    } catch (err) {
      console.error('Error adding meal:', err);
      alert('Error adding meal.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setImageUrl(result.data.url);
      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Image upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl border border-purple-200">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center tracking-wide drop-shadow-md">
        Add New Meal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className={`w-full rounded-lg border px-4 py-3 text-lg transition
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              ${errors.title ? 'border-pink-500 bg-pink-50' : 'border-indigo-300 bg-white'}`}
            placeholder="Meal title"
          />
          {errors.title && <p className="mt-1 text-pink-600 text-sm italic">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`w-full rounded-lg border px-4 py-3 text-lg transition
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              ${errors.category ? 'border-pink-500 bg-pink-50' : 'border-indigo-300 bg-white'}`}
          >
            <option value="">Select category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          {errors.category && <p className="mt-1 text-pink-600 text-sm italic">{errors.category.message}</p>}
        </div>

        {/* Image upload */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full cursor-pointer rounded-lg border border-indigo-300 bg-white px-4 py-2 text-indigo-700 hover:bg-indigo-100 transition"
          />
          {uploading && <p className="mt-2 text-indigo-600 font-semibold animate-pulse">Uploading image...</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="mt-4 w-full h-40 rounded-xl object-cover shadow-lg border-4 border-indigo-300"
            />
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Ingredients</label>
          <textarea
            {...register('ingredients', { required: 'Ingredients are required' })}
            rows="3"
            className={`w-full rounded-lg border px-4 py-3 text-lg resize-none transition
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              ${errors.ingredients ? 'border-pink-500 bg-pink-50' : 'border-indigo-300 bg-white'}`}
            placeholder="List ingredients separated by commas"
          />
          {errors.ingredients && <p className="mt-1 text-pink-600 text-sm italic">{errors.ingredients.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows="4"
            className={`w-full rounded-lg border px-4 py-3 text-lg resize-none transition
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              ${errors.description ? 'border-pink-500 bg-pink-50' : 'border-indigo-300 bg-white'}`}
            placeholder="Meal description"
          />
          {errors.description && <p className="mt-1 text-pink-600 text-sm italic">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be non-negative' },
            })}
            className={`w-full rounded-lg border px-4 py-3 text-lg transition
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              ${errors.price ? 'border-pink-500 bg-pink-50' : 'border-indigo-300 bg-white'}`}
            placeholder="Price"
          />
          {errors.price && <p className="mt-1 text-pink-600 text-sm italic">{errors.price.message}</p>}
        </div>

        {/* Post Time (read-only) */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Post Time</label>
          <input
            type="text"
            value={new Date().toLocaleString()}
            readOnly
            className="w-full rounded-lg bg-indigo-100 border border-indigo-300 px-4 py-3 text-lg cursor-not-allowed"
          />
        </div>

        {/* Distributor Name (read-only) */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Distributor Name</label>
          <input
            type="text"
            value={distributorName}
            readOnly
            className="w-full rounded-lg bg-indigo-100 border border-indigo-300 px-4 py-3 text-lg cursor-not-allowed"
          />
        </div>

        {/* Distributor Email (read-only) */}
        <div>
          <label className="block mb-2 font-semibold text-indigo-800">Distributor Email</label>
          <input
            type="email"
            value={distributorEmail}
            readOnly
            className="w-full rounded-lg bg-indigo-100 border border-indigo-300 px-4 py-3 text-lg cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600
                     hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600
                     text-white font-bold py-3 rounded-xl shadow-lg transition transform
                     hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Meal
        </button>
      </form>
    </div>
  );
}
