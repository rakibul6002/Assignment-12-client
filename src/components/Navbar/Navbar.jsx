import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/images.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AuthContext } from "../../provider/Auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false); // Close dropdown on logout
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-blue-600">
          <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
          <span>NUB HOSTEL</span>
        </Link>

        <div className="hidden md:flex gap-6 text-base font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="/meals" className="hover:text-blue-600 transition duration-300">Meals</Link>
          <Link to="/upcoming-meals" className="hover:text-blue-600 transition duration-300">Upcoming Meals</Link>
        </div>

        <div className="flex items-center gap-4">
          <IoMdNotificationsOutline className="text-2xl text-gray-700" />

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <p className="px-4 py-2 font-semibold">{user.displayName || "User"}</p>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/joinus"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:from-green-500 hover:to-green-700 transition"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden px-4 py-2 flex justify-center gap-4 text-sm font-medium text-gray-700 bg-gray-50 border-t">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/meals" className="hover:text-blue-600 transition">Meals</Link>
        <Link to="/upcoming-meals" className="hover:text-blue-600 transition">Upcoming</Link>
      </div>
    </nav>
  );
};

export default Navbar;
