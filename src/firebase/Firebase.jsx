import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {getDatabase, onChildAdded, ref, set, onChildRemoved, push} from "firebase/database";

import {updateMovieList, addMovieToList, removeMovieFromList} from "/src/features/movieList/movieListSlice"
import { setUsername, setUserId, getUserId, addStreamingService, removeStreamingService } from "../features/userPage/userPageSlice";
import firebaseConfig from "/src/FirebaseConfig.jsx";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "@firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();

let firebase = {
    app: null,
    database: null
}

export const FirebaseContext = createContext();

export default ({children}) => {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(getUserId);

    if (!firebase.api) {
        firebase = {
            app: app,
            database: database,

            //Here all functions that communicate with firebase are declared.
            api: {
                addMovie,
                removeMovie,
                addService,
                removeService,
                signIn,
                register,
                signOutEvent,
            }
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const userId = user.uid;
              console.log("auth state", userId)
              console.log("username", user.displayName)
              dispatch(setUsername(user.displayName))
              dispatch(setUserId(userId))
              // ...
            } else {
              // User is signed out
              // ...
              dispatch(setUserId(null))
            }
          });
    }, [])

    function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user.uid;
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
    function register(email, password, username) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: username,
                })
                console.log(user, "registered")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }
    function signOutEvent() {
        signOut(auth).then(() => {
            window.location = "/"
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
            // An error happened.
          });
    }

    useEffect(() => {
        if(loggedInUser){
            onChildAdded(ref(database, 'movieList/' + loggedInUser), (data) => {
                dispatch(addMovieToList(data.val()))
            })
            onChildAdded(ref(database, 'services/' + loggedInUser), (data) => {
                dispatch(addStreamingService(data.val()))
            })
            onChildRemoved(ref(database, 'movieList/' + loggedInUser), (data) => {
                dispatch(removeMovieFromList(data.val()))
            })
            onChildRemoved(ref(database, 'services/' + loggedInUser), (data) => {
                dispatch(removeStreamingService(data.val()))
            })
        }
    }, [loggedInUser])
    
    //Functions for adding and removing movies from firebase, called from RenderMovies
    function addMovie(movie, userId) {
        const postListRef = ref(database, 'movieList/' + userId + '/' + movie.imdbId);
        set(postListRef, movie)
    }
    function removeMovie(movie, userId) {set(ref(database, 'movieList/' + userId + '/' + movie.imdbId), null);}

    //Functions for adding and removing streaming services, called from UserPage
    function addService(service, userId) {set(ref(database, 'services/' + userId + '/' + service), service);}
    function removeService(service, userId) {set(ref(database, 'services/' + userId + '/' + service), null);}

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}