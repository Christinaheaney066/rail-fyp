import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../home/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";


function Login(){
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
    const [user, loading, error] = useAuthState(auth);
	  const navigate = useNavigate();
      useEffect(() => {
        if (loading) {
          // loading screen
          return;
        }
        if (user) navigate("/Dashboard");
      }, [user, loading]);

	return(
	<div className="login">
          <div className="login__container">
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="login__btn"
              onClick={() => signInWithEmailAndPassword(auth, email, password)}
            >
              Login
            </button>
            <button className="login__btn login__google" onClick={signInWithGoogle}>
              Login with Google
            </button>

            <div>
           <Link to="/Register">Register</Link> now.
            </div>
          </div>
        </div>
      );
    }

export default Login