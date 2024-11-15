import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage() {
  // State variables to store user data and feedback
  const [currentPassword, setCurrentPassword] = useState(""); // Stores the current password input by the user
  const [newPassword, setNewPassword] = useState(""); // Stores the new password input by the user
  const [orders, setOrders] = useState([]); // Stores the user's order history
  const [message, setMessage] = useState(""); // Stores messages for feedback (e.g., success or error)
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false, // Determines if the user is an admin
  });

  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle the password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to the backend to change the password
      const response = await axios.post(
        "http://localhost:8081/change-password",
        {
          currentPassword,
          newPassword,
        }
      );
      setMessage(response.data); // Displaying the response message from the server
    } catch (error) {
      setMessage("Error changing password"); // Error handling if the request fails
      console.error(error);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Sending a POST request to logout the user
      const response = await axios.post("http://localhost:8081/logout");
      if (response.status === 200) {
        // Clearing user data from localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("userId");
        // Navigating the user to the login page after logout
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout", error); // Error handling during logout
    }
  };

  // Function to handle navigating to the admin dashboard
  const handleAdminDashboard = () => {
    navigate("/manage"); // Redirects to the admin dashboard
  };

  // useEffect hook to fetch user details and orders on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // First check if the user details are already in localStorage
        const userInfo = localStorage.getItem("userDetails");
        if (userInfo) {
          setUserDetails(JSON.parse(userInfo)); // Parse and set user details from localStorage
        } else {
          // If not in localStorage, fetch from the backend
          const response = await axios.get(
            "http://localhost:8081/user-details"
          );
          setUserDetails(response.data);
          localStorage.setItem("userDetails", JSON.stringify(response.data)); // Store in localStorage
        }
      } catch (error) {
        console.error("Error fetching user details:", error); // Error handling if fetching fails
      }
    };
    fetchUserDetails();

    const fetchOrders = async () => {
      try {
        // Fetching the user's order history from the backend
        const response = await axios.get("http://localhost:8081/orders");
        setOrders(response.data); // Setting the order data
      } catch (error) {
        console.error("Error fetching orders:", error); // Error handling if fetching fails
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Account Settings</h2>
      <div>
        {/* Displaying user details */}
        <p>
          <strong>First Name:</strong> {userDetails.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userDetails.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </div>
      {/* Form for changing the user's password */}
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>} {/* Displaying feedback message */}
      {/* Button to logout the user */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      {/* If the user is an admin, show the "Admin Dashboard" button */}
      {userDetails.isAdmin && (
        <button className="admin-btn" onClick={handleAdminDashboard}>
          Admin Dashboard
        </button>
      )}
      {/* Displaying the user's order history */}
      <h3>Order History</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.order_description}</li>
        ))}
      </ul>
    </div>
  );
}

export default SettingsPage;
