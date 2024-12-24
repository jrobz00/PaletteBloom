import React, { useState, useEffect } from "react";
import { FiTrash2, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Adjust the path to match your setup
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("User not authenticated.");
        alert("Please log in to access the admin panel.");
        setLoading(false);
        return;
      }

      try {
        // Wait for the user's custom claims to load
        const idTokenResult = await currentUser.getIdTokenResult();

        if (idTokenResult.claims.role !== "admin") {
          console.error("User is not an admin.");
          alert("You do not have permission to access this page.");
          setLoading(false);
          return;
        }

        // Fetch users from Firestore
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched users:", usersList);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please check your Firestore rules and authentication.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert(`User with ID ${userId} has been deleted.`);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleAddUser = () => {
    navigate("/add-user");
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.name || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{user.email || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{user.role || "N/A"}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
