import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/Auth/AuthProvider';
import Swal from 'sweetalert2';

const packageDetails = {
  silver: {
    name: 'Silver',
    price: '$9.99/month',
    benefits: ['Basic support', 'Access to standard features'],
    emoji: '🥈',
    color: 'text-gray-600',
  },
  gold: {
    name: 'Gold',
    price: '$19.99/month',
    benefits: ['Priority support', 'All Silver features', 'Early access to new features'],
    emoji: '🥇',
    color: 'text-yellow-700',
  },
  platinum: {
    name: 'Platinum',
    price: '$29.99/month',
    benefits: ['24/7 VIP support', 'All Gold features', 'Exclusive content & updates'],
    emoji: '💎',
    color: 'text-purple-700',
  },
};

export default function MembershipCheckout() {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const selectedPackage = packageDetails[packageName?.toLowerCase()];

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

  const handleCheckout = async () => {
    if (!newUser?._id || !packageName) return;

    try {
      const res = await fetch('http://localhost:5000/membership/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUser._id, packageName }),
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: data.message,
          confirmButtonColor: '#ec4899', // pink-500 color
        });
        navigate('/dashboard'); // Adjust if your dashboard route differs
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error,
          confirmButtonColor: '#ec4899',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.',
        confirmButtonColor: '#ec4899',
      });
      console.error(error);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-500">
        <h2 className="text-3xl font-bold">🚫 Invalid Package</h2>
        <p className="mt-2">Please select a valid membership plan from the membership page.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-10 text-center">
        <div className="text-6xl mb-4">{selectedPackage.emoji}</div>
        <h2 className={`text-3xl font-bold ${selectedPackage.color}`}>
          {selectedPackage.name} Membership
        </h2>
        <p className="text-lg text-gray-600 mt-2 mb-4">Only {selectedPackage.price}</p>

        <ul className="text-left list-disc list-inside text-gray-700 mb-6">
          {selectedPackage.benefits.map((benefit, index) => (
            <li key={index}>✅ {benefit}</li>
          ))}
        </ul>

        <button
          onClick={handleCheckout}
          disabled={loadingUser}
          className="mt-4 bg-pink-500 text-white text-lg px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-lg disabled:opacity-50"
        >
          Confirm & Checkout
        </button>
      </div>
    </div>
  );
}
