import React, { useContext } from 'react';
import { AuthContext } from '../../provider/Auth/AuthProvider';

export default function MyProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
          alt={`${user?.displayName || 'User'} profile photo`}
          className="w-28 h-28 rounded-full border-4 border-blue-300"
        />
        <h2 className="text-2xl font-bold mt-4 text-blue-700">
          {user?.displayName || 'User'}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Badges</h3>
        <div className="flex justify-center space-x-4">
          <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            🥇 Gold
          </div>
          <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            🥉 Bronze
          </div>
        </div>
      </div>
    </div>
  );
}
