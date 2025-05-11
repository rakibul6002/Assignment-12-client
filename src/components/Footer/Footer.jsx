import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">NUB Hostel</h2>
          <p className="text-sm text-gray-300">
            Making your hostel life easier with meals, reviews, and smart management.
          </p>
          <div className="flex space-x-4 mt-4 text-lg">
            <a href="#" className="hover:text-blue-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-300"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FaGithub /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/meals" className="hover:underline">Meals</Link></li>
            <li><Link to="/upcoming-meals" className="hover:underline">Upcoming Meals</Link></li>
            <li><Link to="/membership" className="hover:underline">Membership</Link></li>
            <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Report an Issue</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-sm text-gray-300">
            📍 NUB Campus, Dhaka, Bangladesh
          </p>
          <p className="text-sm text-gray-300 mt-2">📞 +880 1234-567890</p>
          <p className="text-sm text-gray-300">📧 support@nubhostel.com</p>
        </div>
      </div>
      <div className="divider divider-neutral"></div> 
      <div className="text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} NUB Hostel. All rights reserved.
      </div>
    </footer>
  );
}
