import React from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Silver',
    price: '$9.99/month',
    emoji: '🥈',
    bg: 'bg-slate-100',
    border: 'border-gray-300',
    text: 'text-gray-600',
  },
  {
    name: 'Gold',
    price: '$19.99/month',
    emoji: '🥇',
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
  },
  {
    name: 'Platinum',
    price: '$29.99/month',
    emoji: '💎',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-700',
  },
];

export default function MembershipSection() {
  const navigate = useNavigate();

  const handleSelect = (packageName) => {
    navigate(`/checkout/${packageName.toLowerCase()}`);
  };

  return (
    <div className="py-12 px-6 md:px-12 bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">✨ Upgrade Your Membership ✨</h2>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Choose the perfect plan to unlock exclusive features and perks!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-3xl shadow-xl p-8 ${pkg.bg} ${pkg.border} border-2 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer`}
            onClick={() => handleSelect(pkg.name)}
          >
            <div className="text-5xl mb-4">{pkg.emoji}</div>
            <h3 className={`text-2xl font-bold mb-2 ${pkg.text}`}>{pkg.name} Package</h3>
            <p className="text-xl font-medium text-gray-700">{pkg.price}</p>
            <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-full transition">
              Select {pkg.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
