import { useNavigate } from "react-router-dom";
import { FaCrown, FaStar, FaGem } from "react-icons/fa";

const packages = [
  {
    name: "Silver",
    price: "$9.99/month",
    icon: <FaStar className="text-4xl text-gray-400" />,
    benefits: ["Basic meal access", "Email support"],
    gradient: "from-gray-100 via-white to-gray-50",
    border: "border-gray-300"
  },
  {
    name: "Gold",
    price: "$19.99/month",
    icon: <FaCrown className="text-4xl text-yellow-500" />,
    benefits: ["Priority meal booking", "All Silver benefits", "Monthly report"],
    gradient: "from-yellow-100 via-white to-yellow-50",
    border: "border-yellow-300"
  },
  {
    name: "Platinum",
    price: "$29.99/month",
    icon: <FaGem className="text-4xl text-purple-500" />,
    benefits: ["Free meal customization", "1-on-1 support", "All Gold benefits"],
    gradient: "from-purple-100 via-white to-purple-50",
    border: "border-purple-300"
  }
];

export default function MembershipSection() {
  const navigate = useNavigate();

  const handleCheckout = (pkg) => {
    navigate(`/checkout/${pkg}`);
  };

  return (
    <section className="py-14 ">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">✨ Upgrade Your Membership ✨</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => handleCheckout(pkg.name.toLowerCase())}
              className={`cursor-pointer bg-gradient-to-br ${pkg.gradient} border-2 ${pkg.border} rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-center`}
            >
              <div className="mb-3 flex justify-center">{pkg.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{pkg.name} Package</h3>
              <p className="text-lg font-bold mb-4 text-green-600">{pkg.price}</p>
              <ul className="mb-6 text-gray-700 text-sm space-y-2">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i}>✅ {benefit}</li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
