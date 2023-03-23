import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../home/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div id="loginform">
      <h2 id="headerTitle">Login</h2>
      <div>
        <div class="row">
          <label>E-mail Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div class="row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div id="button" class="row">
          <button onClick={() => signInWithEmailAndPassword(auth, email, password)}>
            Login
          </button>
        </div>
        <div id="alternativeLogin">
          <label>Or sign in with:</label>
          <div id="iconGroup">
            <a href="#" id="googleIcon" onClick={signInWithGoogle}></a>
          </div>
        </div>
        <div>
          <Link to="/Register">Register</Link> now.
        </div>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
