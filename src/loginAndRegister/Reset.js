import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordResetEmail, signInWithGoogle } from "../home/firebase";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";


function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);

const handleReset = () => {
  if (email) {
    sendPasswordResetEmail(email)
      .then(() => alert("Password reset email sent"))
      .catch((error) => alert(error.message));
  } else {
    alert("Please enter your email address");
  }
};

  return (
    <div id="loginform">
      <h2 id="headerTitle">Reset Password</h2>
      <div>
        <div className="row">
          <label>E-mail Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
            </div>
            <div id="button" className="row">
            <button onClick={handleReset}>Send password reset email</button>
            </div>
            <div>
            Do not have an account?
             <Link to="/register">Register</Link> now.
             </div>
             </div>
             </div>
             );
             }

             export default Reset;