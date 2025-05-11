import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/Auth/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdSpaceDashboard, MdPerson, MdRateReview, MdFastfood } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export default function DashNavbar() {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      (async () => {
        try {
          const response = await fetch(`https://nub-hostel-server.vercel.app/users/${encodeURIComponent(user.email)}`);
          if (response.ok) {
            const data = await response.json();
            setNewUser(data);
            setIsAdmin(data?.role === "Admin");
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

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-300 to-blue-300 shadow-md p-4 flex justify-between items-center rounded-t-xl">
      {/* Mobile Menu Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full bg-indigo-500 text-white shadow-lg">
        <FaBars className="w-6 h-6" />
      </button>

      {/* Welcome Message */}
      <h1 className="text-lg sm:text-xl font-semibold text-white drop-shadow-md">
        {loading ? "Loading..." : `Welcome, ${newUser?.role || "Guest"}! 🏨`}
      </h1>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white hover:text-indigo-900 transition">
          <AiOutlineHome className="text-2xl" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="relative text-white hover:text-indigo-900">
            <FiBell className="text-2xl" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* Profile Image */}
        {loading ? (
          <div className="w-12 h-12 border-4 border-indigo-300 rounded-full flex items-center justify-center animate-spin"></div>
        ) : (
          <img
            src={newUser?.image || "https://i.pravatar.cc/100"}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-4 border-indigo-500 shadow-md"
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-start justify-start p-6">
          <div className="w-64 bg-white h-full shadow-lg p-6 rounded-xl flex flex-col space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-indigo-700">Dashboard Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 text-xl">
                <FaTimes />
              </button>
            </div>
            <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
              <MdSpaceDashboard className="text-2xl" /> Dashboard
            </NavLink>
            {isAdmin ? (
              <>
                <NavLink to="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <RiAdminFill className="text-2xl" /> Admin Profile
                </NavLink>
                <NavLink to="/dashboard/manage-users" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdPerson className="text-2xl" /> Manage Users
                </NavLink>
                <NavLink to="/dashboard/manage-meals" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdFastfood className="text-2xl" /> Manage Meals
                </NavLink>
                <NavLink to="/dashboard/manage-reviews" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdRateReview className="text-2xl" /> Manage Reviews
                </NavLink>
                <NavLink to="/dashboard/upcoming-meals" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdFastfood className="text-2xl" /> Upcoming Meals
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <CgProfile className="text-2xl" /> My Profile
                </NavLink>
                <NavLink to="/dashboard/my-meals" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdFastfood className="text-2xl" /> Requested Meals
                </NavLink>
                <NavLink to="/dashboard/reviews" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  <MdRateReview className="text-2xl" /> My Reviews
                </NavLink>
                <NavLink to="/dashboard/payments" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100">
                  💳 Payment History
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
