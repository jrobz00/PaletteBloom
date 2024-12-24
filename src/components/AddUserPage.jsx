import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Free"); // Default role is "Free"
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    const newUser = { name, email, role };

    // Mock API call to add a user
    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      console.log("User added:", newUser);

      // Redirect to admin page after successful addition
      navigate("/admin");
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New User</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
