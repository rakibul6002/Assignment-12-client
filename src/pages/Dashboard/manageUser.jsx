import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      setUsers(data || []);
      setFilteredUsers(data || []);
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
    const lowerSearch = search.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowerSearch) ||
        user.email?.toLowerCase().includes(lowerSearch)
    );
    setFilteredUsers(filtered);
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
        const res = await fetch(`http://localhost:5000/users/user/${userId}`, {
          method: 'PATCH',
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
          Swal.fire('🎉 Success!', 'User promoted to admin', 'success');
          fetchUsers();
        }
      } catch (error) {
        console.error('Make admin error:', error);
      }
    }
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/users/user/${userId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire('Deleted!', 'User has been removed.', 'success');
          fetchUsers();
        }
      } catch (err) {
        console.error('Delete user error:', err);
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">👥 Manage Users</h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 flex justify-end">
          <div className="flex items-center bg-gray-100 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-indigo-300">
            <input
              type="text"
              placeholder="Search by name or email ✨"
              className="px-4 py-2 w-72 outline-none bg-transparent text-gray-700 placeholder-gray-500"
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
            <div className="w-12 h-12 border-4 border-indigo-400 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl text-left">#</th>
                  <th className="px-4 py-3 text-left">👤 Name</th>
                  <th className="px-4 py-3 text-left">📧 Email</th>
                  <th className="px-4 py-3 text-center">⭐ Role</th>
                  <th className="px-4 py-3 text-center">🎫 Subscription</th>
                  <th className="px-4 py-3 text-center">🛠 Action</th>
                  <th className="px-4 py-3 rounded-r-xl text-center">🗑️ Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      😿 No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-white hover:bg-indigo-50 shadow rounded-xl"
                    >
                      <td className="px-4 py-3 font-medium text-indigo-600">{index + 1}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 text-center">
                        {user.role === 'admin' ? (
                          <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                            Admin 💼
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                            User 👤
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {user.subscription ? (
                          <span className="text-indigo-600 font-semibold">Premium 💎</span>
                        ) : (
                          <span className="text-gray-500">Free 🍃</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="bg-pink-400 hover:bg-pink-500 text-white text-sm px-4 py-1.5 rounded-full transition"
                          >
                            Make Admin ✨
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-400 hover:bg-red-500 text-white text-sm px-4 py-1.5 rounded-full transition"
                        >
                          Delete 🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
