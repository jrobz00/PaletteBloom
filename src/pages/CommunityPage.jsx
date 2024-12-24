import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore instance
import { onAuthStateChanged } from "firebase/auth";

const CommunityPage = () => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [ideaText, setIdeaText] = useState(""); // Text of the new idea
  const [ideas, setIdeas] = useState([]); // List of ideas

  // Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch ideas in real-time
  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIdeas(ideasData);
    });

    return () => unsubscribe();
  }, []);

  // Handle idea submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ideaText.trim() === "") return;

    try {
      await addDoc(collection(db, "ideas"), {
        userId: user.uid,
        displayName: user.displayName || "Anonymous",
        ideaText,
        timestamp: new Date(),
      });
      setIdeaText(""); // Clear the input field
    } catch (error) {
      console.error("Error adding idea: ", error);
    }
  };

  // Handle idea deletion
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ideas", id));
    } catch (error) {
      console.error("Error deleting idea: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Community Page</h1>

      {user ? (
        <div>
          {/* Post Idea Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="Share your idea..."
              className="w-full p-3 border rounded mb-2"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Post
            </button>
          </form>

          {/* Ideas List */}
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="p-4 border rounded shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{idea.displayName}</h3>
                  {idea.userId === user.uid && (
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-700">{idea.ideaText}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Please log in to share your ideas.</p>
      )}
    </div>
  );
};

export default CommunityPage;
