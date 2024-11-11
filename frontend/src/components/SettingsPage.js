import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  });
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mubu.herokuapp.com/change-password",
        {
          currentPassword,
          newPassword,
        }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Error changing password");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://mubu.herokuapp.com/logout");
      if (response.status === 200) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("userId");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const handleAdminDashboard = () => {
    navigate("/manage");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = localStorage.getItem("userDetails");
        if (userInfo) {
          setUserDetails(JSON.parse(userInfo));
        } else {
          const response = await axios.get(
            "https://mubu.herokuapp.com/user-details"
          );
          setUserDetails(response.data);
          localStorage.setItem("userDetails", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();

    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://mubu.herokuapp.com/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserDetails();
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Account Settings</h2>
      <div>
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
      {message && <p>{message}</p>}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {userDetails.isAdmin && (
        <button className="admin-btn" onClick={handleAdminDashboard}>
          Admin Dashboard
        </button>
      )}

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
