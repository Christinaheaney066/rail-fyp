const App = props => (
    <LoginForm />
);


class LoginForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
        <OtherMethods />
      </div>
    )
  }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Username" placeholder="Enter your username" type="text" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormButton title="Log in"/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
  <a href="#" id="twitterIcon"></a>
);

const Google = props => (
  <a href="#" id="googleIcon"></a>
);

ReactDOM.render(<App />, document.getElementById('container'));





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
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
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
                    <div>
                      <Link to="/reset">Forgot Password</Link>
                    </div>
          </div>
        </div>
      );
    }

export default Login

.login {
  height: 80vh;
  width: 80vw;
  display: flex;
  align-items: center;

}
.login__container {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
}
.login__textBox {
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
}
.login__btn {
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
}
.login__google {
  background-color: #4285f4;
}
.login div {
  margin-top: 7px;
}


























