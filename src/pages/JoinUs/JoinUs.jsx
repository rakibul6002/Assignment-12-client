import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/Auth/AuthProvider";
import { motion } from "framer-motion";

export default function JoinUs() {
  const { createUser, googleSignin, signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const from = location.state?.from?.pathname || "/";

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: regErrors },
    reset: resetRegister,
    setError,
    clearErrors,
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  const onRegisterSubmit = async (data) => {
    if (!selectedFile) {
      setError("image", { type: "manual", message: "Please select an image." });
      return;
    } else {
      clearErrors("image");
    }

    Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading() });

    try {
      const result = await createUser(data.email, data.password);
      const user = result?.user;

      if (user) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("badge", "Bronze");
        formData.append("image", selectedFile);

        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          body: formData,
        });

        const resData = await response.json();
        Swal.close();

        if (resData.message) {
          Swal.fire("Success", "Registration complete!", "success");
          resetRegister();
          setSelectedImage(null);
          setSelectedFile(null);
          navigate(from);
        } else {
          Swal.fire("Error", "Registration failed!", "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const onLoginSubmit = async (data) => {
    Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading() });

    try {
      const result = await signIn(data.email, data.password);
      const user = result?.user;

      Swal.close();
      if (user) {
        Swal.fire("Success", "Login successful!", "success");
        resetLogin();
        navigate(from);
      } else {
        Swal.fire("Error", "Invalid credentials!", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.close();
      Swal.fire("Error", "Login failed!", "error");
    }
  };

  const handleGoogleSignIn = async () => {
    Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading() });

    try {
      const result = await googleSignin();
      const user = result?.user;

      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          badge: "Bronze",
        };

        const response = await fetch("http://localhost:5000/users/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        Swal.close();

        if (data.message) {
          Swal.fire("Success", "Login successful!", "success");
          navigate(from);
        } else {
          Swal.fire("Error", "Failed to register user!", "error");
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Swal.close();
      Swal.fire("Error", "Google sign-in failed!", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-300 to-indigo-400 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/40"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          {isLogin ? "Welcome Back!" : "Join Us!"}
        </h2>

        {!isLogin && (
          <motion.div
            className="w-32 mx-auto mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="relative w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile Preview"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <FaCamera className="text-gray-500 text-2xl" />
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...registerRegister("image", { required: true })}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </label>
            {regErrors.image && (
              <p className="text-red-500 text-sm mt-1 text-left">{regErrors.image.message}</p>
            )}
          </motion.div>
        )}

        {!isLogin && (
          <form onSubmit={handleSubmitRegister(onRegisterSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              {...registerRegister("name", { required: "Name is required" })}
              className={`w-full p-3 border rounded-xl bg-white/80 outline-none ${
                regErrors.name ? "border-red-500" : ""
              }`}
            />
            {regErrors.name && (
              <p className="text-red-500 text-sm text-left">{regErrors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email Address"
              {...registerRegister("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
              })}
              className={`w-full p-3 border rounded-xl bg-white/80 outline-none ${
                regErrors.email ? "border-red-500" : ""
              }`}
            />
            {regErrors.email && (
              <p className="text-red-500 text-sm text-left">{regErrors.email.message}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...registerRegister("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className={`w-full p-3 border rounded-xl bg-white/80 outline-none pr-10 ${
                  regErrors.password ? "border-red-500" : ""
                }`}
              />
              <span
                className="absolute right-3 top-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {regErrors.password && (
              <p className="text-red-500 text-sm text-left">{regErrors.password.message}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-600 transition"
            >
              Sign Up
            </motion.button>
          </form>
        )}

        {isLogin && (
          <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              {...registerLogin("email", { required: "Email is required" })}
              className={`w-full p-3 border rounded-xl bg-white/80 outline-none ${
                loginErrors.email ? "border-red-500" : ""
              }`}
            />
            {loginErrors.email && (
              <p className="text-red-500 text-sm text-left">{loginErrors.email.message}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...registerLogin("password", { required: "Password is required" })}
                className={`w-full p-3 border rounded-xl bg-white/80 outline-none pr-10 ${
                  loginErrors.password ? "border-red-500" : ""
                }`}
              />
              <span
                className="absolute right-3 top-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {loginErrors.password && (
              <p className="text-red-500 text-sm text-left">{loginErrors.password.message}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Log In
            </motion.button>
          </form>
        )}

        <div className="my-4 relative">
          <hr />
          <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500 text-sm">
            Or continue with
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-2 rounded-xl hover:shadow-md transition"
          >
            <FcGoogle size={24} /> Google
          </button>
        </div>

        <p className="mt-6 text-gray-700 text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-purple-600 cursor-pointer font-semibold"
              >
                Join Us
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 cursor-pointer font-semibold"
              >
                Log In
              </span>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
