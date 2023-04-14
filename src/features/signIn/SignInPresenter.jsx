import { useDispatch, useSelector } from "react-redux";
import SignInView from "./SignInView";
import SignOutView from "./SignOutView";
import FirebaseApp from "../../FirebaseConfig";
import {getAuth,createUserWithEmailAndPassword,
  signInWithEmailAndPassword,updateProfile, signOut} from "firebase/auth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //Values used
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = getAuth(FirebaseApp);

  //Imported functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //Dispatched the signIn action and navigates to search when sign in is complete
  const signInButton = async () => {
    console.log("signedIn");
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      alert(err.message)
    })
  };

  //Dispatched the register action and navigates to search when sign in is complete
  const registerButton = async () => {
    console.log("Registered");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {displayName: username})
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      alert(err.message)
    })
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
