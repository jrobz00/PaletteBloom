import React, { useState, useEffect } from "react";
import { FiSettings, FiEye, FiTrash2, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Mock data and functions (replace with actual API calls)
const mockUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Premium" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Free" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Premium" },
];

const fetchUsers = () => {
  // Simulate fetching user data
  return Promise.resolve(mockUsers);
};

const deleteUser = (userId) => {
  // Simulate deleting a user
  return Promise.resolve(`User with ID ${userId} deleted`);
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert(`User with ID ${userId} has been deleted.`);
    }
  };

  const handleAddUser = () => {
    navigate("/add-user"); // Redirect to a user creation page (you'll need to create this)
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleAddUser}
            className="text-blue-600 hover:underline flex items-center space-x-2"
          >
            <FiUserPlus size={20} />
            <span>Add User</span>
          </button>
        </div>
      </header>

      {/* User Management */}
      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <div className="bg-white shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:underline flex items-center justify-center"
                    >
                      <FiTrash2 size={16} />
                      <span className="ml-1">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-4 text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
