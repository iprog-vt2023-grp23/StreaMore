import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {getDatabase, onChildAdded, ref, set, onChildRemoved} from "firebase/database";

import {updateMovieList, addMovieToList, removeMovieFromList} from "/src/features/movieList/movieListSlice"
import { addStreamingService, removeStreamingService } from "../features/userPage/userPageSlice";
import { setUsername, setUserId, getUserId } from "./firebaseSlice";
import FirebaseApp from "/src/FirebaseConfig.jsx";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "@firebase/auth";

//export const app = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);
const database = getDatabase();
console.log("fire", database)

//export const FirebaseContext = createContext();

export default function Firebase (){

    const dispatch = useDispatch();
    const loggedInUser = useSelector(getUserId);

    //console.log("hej")
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const userId = user.uid;
              const username = user.displayName;
              console.log("auth state", userId);
              console.log("Username", username)
              if(username) dispatch(setUsername(username));
              dispatch(setUserId(userId));
              // ...
            } else {
              // User is signed out
              // ...
              dispatch(setUserId(null));
            }
          });
    }, [])

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

    //Functions for adding and removing streaming services, called from UserPage
    function addService(service, userId) {set(ref(database, 'services/' + userId + '/' + service), service);}
    function removeService(service, userId) {set(ref(database, 'services/' + userId + '/' + service), null);}
}