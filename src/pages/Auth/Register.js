import React, { useState } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    if (!email) {
      setErrorMessage("Email is Required.");
    } else if (!password) {
      setErrorMessage("Password is Required.");
    } else if (password.length < 5) {
      setErrorMessage("6 Character Password is Required.");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        navigate("/auth/login");
        // User registered successfully
      } catch (error) {
        // Check if the error is due to email already being in use
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "Email is already in use. Please use a different email."
          );
        } else {
          console.error("Error registering user:", error);
          setErrorMessage("An error occurred during registration.");
        }
      }
    }
  };

  return (
    <form>
      <h1>Register</h1>
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
      <button class="btn" onClick={handleSignup}>Sign Up</button>
    </form>
  );
}

export default Register;
