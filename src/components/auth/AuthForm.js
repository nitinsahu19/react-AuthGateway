import { useState, useRef, useContext, useEffect } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  // Access the history object to manage navigation
  const history = useHistory();

  // Access the authentication context
  const authCtx = useContext(AuthContext);

  // Use useRef to create references to the email and password input fields
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // State to manage whether the user is in login or signup mode
  const [isLogin, setIsLogin] = useState(true);

  // State to manage loading state during authentication
  const [isLoading, setIsLoading] = useState(false);

  // Function to switch between login and signup modes
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Function to handle form submission
  const submitHandler = (event) => {
    event.preventDefault();

    // Extract entered email and password values from input fields
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Set loading state to true during authentication request
    setIsLoading(true);

    // Define the API endpoint based on login or signup mode
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBSlThC5K2GCNMdoJKeBTyJAFClVuds9Q";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBSlThC5K2GCNMdoJKeBTyJAFClVuds9Q";
    }

    // Fetch data from the API
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          // Handle authentication error
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle successful authentication
        // console.log(data);
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((error) => {
        // Handle error and alert the user
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
