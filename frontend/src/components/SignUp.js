import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUpLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "https://mubu.herokuapp.com/login"
      : "https://mubu.herokuapp.com/signup";
    const data = isLogin
      ? { email, password }
      : { first_name: firstName, last_name: lastName, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response data:", result);

        if (isLogin) {
          console.log(
            "User ID:",
            result.userDetails
              ? result.userDetails.userId
              : "No User ID in response"
          );

          if (result.userDetails && result.userDetails.userId) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", result.userDetails.userId);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(result.userDetails)
            );
            console.log("Data stored in localStorage.");
          }
        }

        navigate("/products");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>MUBU</h1>
      </div>
      <div className="auth-tabs">
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          S'inscrire
        </button>
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Se connecter
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Se connecter" : "S'inscrire"}</h2>
        {!isLogin && (
          <>
            <div className="input-group">
              <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="input-group">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default SignUpLogin;
