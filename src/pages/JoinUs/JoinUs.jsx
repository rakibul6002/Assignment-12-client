import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../provider/Auth/AuthProvider";

export default function JoinUs() {
  const [isLogin, setIsLogin] = useState(true);
  const [photo, setPhoto] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, signInUser, googleSignin } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const userData = {
      ...data,
      badge: "Bronze", // default badge
      photo: photo ? photo.name : "", // handle photo upload
    };

    try {
      if (isLogin) {
        await signInUser(data.email, data.password);
      } else {
        await createUser(data.email, data.password);
        
        if (photo) {
          // Update user profile with photo here if needed
        }
      }
      reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignin();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          {isLogin ? "Login to NUB Hostel" : "Register for NUB Hostel"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

          {!isLogin && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {photo && <p className="text-sm text-gray-600 mt-2">Uploaded: {photo.name}</p>}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-semibold hover:underline">
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>

        <div className="mt-6">
          <p className="text-gray-600 mb-2">Or continue with:</p>
          <div className="flex justify-center gap-4 text-xl">
            <button onClick={handleGoogleLogin} className="p-2 rounded-full bg-red-100 hover:bg-red-200 shadow">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 shadow">
              <FaFacebook className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
