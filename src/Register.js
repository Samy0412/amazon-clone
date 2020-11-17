import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function Register() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");


  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          auth.user.updateProfile({
            displayName: userName, // userName,
          });
        }
        console.log("new user>>>", user);
        history.replace("/");
      })
      .catch(function (error) {
        // Handle Errors here.
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="http://logok.org/wp-content/uploads/2015/01/Amazon-logo-880x660.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Create Account</h1>
        <form>
          <h5>Your name</h5>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={register} className="login__signInButton">
            Create your Amazon Account
          </button>
        </form>
        <p>
          By creating an account, you agree to the AMAZON FAKE CLONE Conditions
          of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
}

export default Register;
