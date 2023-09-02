import React, { useState } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email) {
      setErrorMessage("Email is Required.");
    } else if (!password) {
      setErrorMessage("Password is Required.");
    } else if (password.length < 5) {
      setErrorMessage("6 Character Password is Required.");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        // User LOGIN successfully
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("Email is not registered.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;
          default:
            console.error("Error logging in:", error);
            break;
        }
      }
    }
  };

  return (
    <form>
      <h1>Login</h1>
      <fieldset>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </fieldset>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button class="btn" onClick={handleLogin}>Log In</button>
    </form>
  );
}

export default Register;
