import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdPerson,
  MdOutlineAddShoppingCart,
  MdFastfood,
  MdRateReview,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../provider/Auth/AuthProvider";
import Logo from "../../assets/Logo/images.jpg";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      (async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/users/${encodeURIComponent(user.email)}`
          );
          if (response.ok) {
            const data = await response.json();
            setNewUser(data);
          } else {
            console.error("Error fetching user data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-4 text-white">Loading...</div>;
  }

  const role = newUser?.role;

  return (
    <div className="h-full flex flex-col p-5 bg-gradient-to-b from-blue-300 to-indigo-400 shadow-lg text-white w-64">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img className="rounded-full w-14" src={Logo} alt="Logo" />
        <p className="text-2xl font-bold text-center mt-2">NUB HOSTEL</p>
      </div>

      <div className="border-t-2 border-white opacity-50 my-4"></div>

      {/* Navigation */}
      <ul className="space-y-3">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
        >
          <MdSpaceDashboard className="text-2xl" /> Dashboard
        </NavLink>

        {role === "admin" ? (
          <>
            <NavLink
              to="adminProfile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <RiAdminFill className="text-2xl" /> Admin Profile
            </NavLink>

            <NavLink
              to="manageUser"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdPerson className="text-2xl" /> Manage Users
            </NavLink>

            <NavLink
              to="addMeal"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdOutlineAddShoppingCart className="text-2xl" /> Add Meal
            </NavLink>

            <NavLink
              to="allMeal"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdFastfood className="text-2xl" /> All Meals
            </NavLink>

            <NavLink
              to="allReviews"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdRateReview className="text-2xl" /> All Reviews
            </NavLink>

            <NavLink
              to="serveMeal"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdFastfood className="text-2xl" /> Serve Meals
            </NavLink>

            <NavLink
              to="upcomingMeal"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdFastfood className="text-2xl" /> Upcoming Meals
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="myProfile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <CgProfile className="text-2xl" /> My Profile
            </NavLink>

            <NavLink
              to="requestedMeal"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdFastfood className="text-2xl" /> Requested Meals
            </NavLink>

            <NavLink
              to="myReviews"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              <MdRateReview className="text-2xl" /> My Reviews
            </NavLink>

            <NavLink
              to="paymentHistory"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              💳 Payment History
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}
