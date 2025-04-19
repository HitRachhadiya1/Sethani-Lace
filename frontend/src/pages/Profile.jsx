import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../utils/api";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        // If user data is already available in auth context, use it
        if (user) {
          setProfileData(user);
          setLoading(false);
        } else {
          // Fetch additional user data if needed
          const response = await fetchWithAuth("/api/user/profile");
          if (response.success) {
            setProfileData(response.user);
          } else {
            setError(response.message || "Failed to fetch profile data");
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("An error occurred while fetching your profile");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchUserProfile();
    }
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        <div className="flex items-center justify-center mb-8">
          {/* Profile picture - using initial as placeholder */}
          <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <h3 className="text-sm text-gray-500 font-medium">Full Name</h3>
            <p className="text-lg font-medium text-gray-800">
              {profileData?.name || "Not provided"}
            </p>
          </div>

          <div className="border-b pb-3">
            <h3 className="text-sm text-gray-500 font-medium">Email Address</h3>
            <p className="text-lg font-medium text-gray-800">
              {profileData?.email || "Not provided"}
            </p>
          </div>

          <div className="border-b pb-3">
            <h3 className="text-sm text-gray-500 font-medium">
              Account Created
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {profileData?.createdAt
                ? new Date(profileData.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Additional sections could be added below */}
      <div className="bg-white p-8 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
        <div className="mt-4">
          <Link
            to="/collection"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
