import SignInView from "./SignInView";
import SignOutView from "./SignOutView";
import FirebaseApp from "../../FirebaseConfig";
import {getAuth,createUserWithEmailAndPassword,
  signInWithEmailAndPassword,updateProfile, signOut} from "firebase/auth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../sidebar/sidebarSlice";

const SignIn = () => {
  //Values used
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authError, setAuthError] = useState("");
  const auth = getAuth(FirebaseApp);

  //Imported functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Functions for changing valeus
  const emailChanged = (e) => setEmail(e.target.value);
  const passwordChanged = (e) => setPassword(e.target.value);
  const usernameChanged = (e) => setUsername(e.target.value);

  //Sign in when enter key is pressed
  function keyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); //Dont reload the page
      signInButton();
    }
  }

  const fielsFilled = () => email != "" && password != "" && username != "";

  //Dispatched the signIn action and navigates to search when sign in is complete
  const signInButton = async () => {
    console.log("signedIn");
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      dispatch(toggleSidebar());  //Tillfällig fulfix för att toggla sidebar när man loggar in
      navigate("/");
    })
    .catch((err) => {
      console.error("Sign in error", err.message)
      setAuthError("Incorrect email or password")
    })
  };

  //Dispatched the register action and navigates to search when sign in is complete
  const registerButton = async () => {
    console.log(fielsFilled())
    if(fielsFilled())
      await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {displayName: username})
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Register error", err.message)
          setAuthError("Please enter a username")
        })
      })
      .catch((err) => {
        console.error("Register error", err.message)
        if(err.message.includes("auth/weak-password"))
          setAuthError("Password needs to be at least 6 characters")
        else if(err.message.include("auth/email-already-in-use"))
          setAuthError("E-mail already registered")
        else
          setAuthError("Invalid e-mail")
      })
    else
      setAuthError("Please fill out all fields")
  };
  const signOutButton = async () => {
    console.log("signedOut");
    await signOut(auth)
    .then(() => {
      location.reload()
    })
  };

  //checks wether the user is signed in
  const isSignedIn = () => {
    if (auth.currentUser) return <SignOutView onSignOut={signOutButton} />;
    else return false;
  };

  return (
    isSignedIn() || (
      <SignInView
        email={email}
        password={password}
        username={username}
        authError={authError}
        onEmailChanged={emailChanged}
        onPasswordChanged={passwordChanged}
        onKeyDown={keyDown}
        onLogin={signInButton}
        onRegister={registerButton}
        onUsernameChanged={usernameChanged}
      />
    )
  );
};

export default SignIn;
