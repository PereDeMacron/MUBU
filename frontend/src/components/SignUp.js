import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUpLogin() {
  // State variables for managing form inputs and UI state
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [firstName, setFirstName] = useState(""); // First name input (only for signup)
  const [lastName, setLastName] = useState(""); // Last name input (only for signup)
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle form submission (both login and signup)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Set the appropriate URL for login or signup
    const url = isLogin
      ? "http://localhost:8081/login" // Login URL
      : "http://localhost:8081/signup"; // Signup URL

    // Set the data to send based on login or signup
    const data = isLogin
      ? { email, password } // For login, only email and password are needed
      : { first_name: firstName, last_name: lastName, email, password }; // For signup, add first and last name

    try {
      // Make an API request to either login or signup
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send data in JSON format
        },
        body: JSON.stringify(data), // Convert data to JSON for the request body
      });

      // If the response is successful (status code 200-299)
      if (response.ok) {
        const result = await response.json(); // Parse the response as JSON
        console.log("Response data:", result); // Log the response for debugging

        // If login is successful, store user details in localStorage
        if (isLogin) {
          console.log(
            "User ID:",
            result.userDetails
              ? result.userDetails.userId
              : "No User ID in response"
          );

          if (result.userDetails && result.userDetails.userId) {
            // Store user data in localStorage for persistence across pages
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", result.userDetails.userId);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(result.userDetails)
            );
            console.log("Data stored in localStorage.");
          }
        }

        // Redirect to the products page after successful login/signup
        navigate("/products");
      } else {
        // If the response is not successful, handle the error
        const errorData = await response.json(); // Parse the error response
        console.error("Error:", errorData); // Log the error data for debugging
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Network error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>MUBU</h1> {/* Header of the authentication page */}
      </div>
      <div className="auth-tabs">
        {/* Toggle between Signup and Login */}
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          S'inscrire {/* Signup button */}
        </button>
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Se connecter {/* Login button */}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Se connecter" : "S'inscrire"}</h2>{" "}
        {/* Form header based on current view */}
        {/* Input fields for signup (only show if isLogin is false) */}
        {!isLogin && (
          <>
            <div className="input-group">
              <input
                type="text"
                placeholder="Prénom" // Placeholder for first name
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nom" // Placeholder for last name
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        {/* Input field for email */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password input with toggle visibility */}
        <div className="input-group password-input">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
          >
            {showPassword ? "🙈" : "👁️"} {/* Icon to show/hide password */}
          </span>
        </div>
        {/* Submit button for login or signup */}
        <button type="submit" className="auth-button">
          {isLogin ? "Se connecter" : "S'inscrire"}{" "}
          {/* Button text changes based on the form state */}
        </button>
      </form>
    </div>
  );
}

export default SignUpLogin;
