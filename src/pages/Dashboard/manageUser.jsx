import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://your-api-url.com/users?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const handleMakeAdmin = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Make this user an admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Make Admin!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://your-api-url.com/users/admin/${userId}`, {
          method: 'PATCH',
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
          Swal.fire('Success', 'User promoted to admin', 'success');
          fetchUsers(search);
        }
      } catch (error) {
        console.error('Make admin error:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Manage Users</h2>

      <form onSubmit={handleSearch} className="mb-6 flex justify-end">
        <div className="flex items-center bg-white rounded-full shadow-lg border focus-within:ring-2 focus-within:ring-indigo-300 transition-all duration-200 overflow-hidden">
          <input
            type="text"
            placeholder="Search by name or email"
            className="px-4 py-2 w-72 outline-none bg-transparent text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-r-full transition duration-200"
          >
            🔍
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Subscription</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-indigo-50">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border text-center">
                      {user.role === 'admin' ? (
                        <span className="text-green-600 font-semibold">Admin</span>
                      ) : (
                        'User'
                      )}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {user.subscription ? 'Subscribed' : 'Free'}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
