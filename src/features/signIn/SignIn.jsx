import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from "react-redux";
import SignInView from "./SignInView";
import SignOutView from "./SignOutView";
import { setUserName } from "../userPage/userPageSlice";
import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from '/src/firebase/Firebase';


/*
*Kanske måste kopplas till kontexten i Firebase.jsx med useContext, vi får la se
*/

const SignIn = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState("");

    const { api } = useContext(FirebaseContext);

    const emailChanged = (e) => setEmail(e.target.value);
    const passwordChanged = (e) => setPassword(e.target.value);

    function keyDown(e) {
        if (e.key === "Enter") {
          e.preventDefault(); //Dont reload the page
          signInButton();
        }
      }
      

    const signInButton = () => {
        console.log("hej")
        api.signIn(email, password);
    }
    const registerButton = () => {
        api.register(email, password);
    }
    const signOutButton = () => {
        console.log("hej")

        api.signOutEvent();
    }

/*
    const signInButton = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                //dispatch(setUserName(user))
                console.log(userCredential.user.uid, "logged in")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }
    const registerButton = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(setUserName(user))
                console.log(user, "logged in")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }
    const signOutButton = async () => {
        await signOut(auth).then(() => {
            window.location = "/"
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
            // An error happened.
          });
    }
*/
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("då")
                setSignedIn(true);
            } else {
                // User is signed out

                console.log("signed out")
                setSignedIn(false);
            }
            });
    }, [])

    const isSignedIn = () => {
        if(signedIn)
            return <SignOutView onSignOut={signOutButton}/>
        else
            return false;
    }
    
    return isSignedIn() || 
        <SignInView 
            email={email}
            password={password}
            onEmailChanged={emailChanged}
            onPasswordChanged={passwordChanged}
            onKeyDown={keyDown}
            onLogin={signInButton}
            onRegister={registerButton}
        />
}

export default SignIn;