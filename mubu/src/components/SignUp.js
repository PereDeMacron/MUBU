import React, { useState } from "react";
import "./Signup.css";

function SignUpLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/api/login" : "/api/signup";
    const data = isLogin
      ? { email, password }
      : { firstName, lastName, email, password };

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
        console.log("Success:", result);
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
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password">👁️</span>
        </div>
        {isLogin && (
          <div className="forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>
        )}
        <button type="submit" className="auth-button">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      {isLogin && (
        <p className="terms">
          En vous connectant, vous acceptez les{" "}
          <a href="#">Conditions d'utilisation</a> et la{" "}
          <a href="#">Politique de confidentialité</a>.
        </p>
      )}
      <div className="auth-divider">ou</div>
      <div className="social-auth">
        <button className="social-button google">G</button>
        <button className="social-button apple">A</button>
        <button className="social-button facebook">f</button>
        <button className="social-button twitter">X</button>
      </div>
      <div className="auth-switch">
        {isLogin ? (
          <p>
            Vous avez besoin d'un compte ?{" "}
            <a href="#" onClick={() => setIsLogin(false)}>
              S'inscrire
            </a>
          </p>
        ) : (
          <p>
            Vous avez déjà un compte ?{" "}
            <a href="#" onClick={() => setIsLogin(true)}>
              Se connecter
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpLogin;
