import { useDispatch, useSelector } from "react-redux";
import {getAuth} from '@firebase/auth'
import SignInView from "./SignInView";
import SignOutView from "./SignOutView";
import { useState, useEffect, useContext } from "react";
import { signIn, register, signOutEvent, getUserId } from "../../firebase/firebaseSlice";

/*
*Kanske måste kopplas till kontexten i Firebase.jsx med useContext, vi får la se
*/

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const userId = useSelector(getUserId);

    const dispatch = useDispatch();
    const emailChanged = (e) => setEmail(e.target.value);
    const passwordChanged = (e) => setPassword(e.target.value);
    const usernameChanged = (e) => setUsername(e.target.value);

    function keyDown(e) {
        if (e.key === "Enter") {
          e.preventDefault(); //Dont reload the page
          signInButton();
        }
      }
      

    const signInButton = () => {
        console.log("signedIn")
        dispatch(signIn({email, password}));
    }
    const registerButton = () => {
        console.log("Registered")
        dispatch(register({email, password, username}));
    }
    const signOutButton = () => {
        console.log("signedOut")
        dispatch(signOutEvent());
    }
    const isSignedIn = () => {
        if(userId)
            return <SignOutView onSignOut={signOutButton}/>
        else
            return false;
    }
    
    return isSignedIn() || 
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
}

export default SignIn;