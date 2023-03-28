import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {getDatabase, onChildAdded, ref, set, onChildRemoved, push} from "firebase/database";

import {updateMovieList, addMovieToList, removeMovieFromList} from "/src/features/movieList/movieListSlice"
import { updateStreamingServices, setUserName, getUserName } from "../features/userPage/userPageSlice";
import firebaseConfig from "/src/FirebaseConfig.jsx";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "@firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();

let firebase = {
    app: null,
    database: null
}

export const FirebaseContext = createContext(null);

export default ({children}) => {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(getUserName);

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
              const username = user.uid;
              console.log("username",loggedInUser)
              dispatch(setUserName(username));
              console.log("username",loggedInUser)
              getMovieList();
              //getServices();
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }, [loggedInUser])

    async function signIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user.uid;
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
    async function register(email, password) {
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
    async function signOutEvent() {
        await signOut(auth).then(() => {
            //window.location = "/"
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
            // An error happened.
          });
    }
    
    //Function for retreiving the movie list from firebase, called from App
    function getMovieList(){
        console.log("whoami", loggedInUser)
        onChildAdded(ref(database, 'movieList/' + loggedInUser), (data) => {
            console.log("hej", loggedInUser)
            dispatch(addMovieToList(data.val()))
        })
        onChildRemoved(ref(database, 'movieList/' + loggedInUser), (data) => {
            dispatch(removeMovieFromList(data.val()))
        })
    }

    //Functions for adding and removing movies from firebase, called from RenderMovies
    function addMovie(movie) {
        console.log("add move user",loggedInUser)
        const postListRef = ref(database, 'movieList/' + loggedInUser);
        const postref = push(postListRef);
        set(postref, movie)
    }
    function removeMovie(movie) {set(ref(database, 'movieList/' + loggedInUser + '/' + movie.imdbId), null);}

    //Functions for adding and removing streaming services, called from UserPage
    function addService(service) {set(ref(database, 'services/' + loggedInUser + service), service);}
    function removeService(service) {set(ref(database, 'services/' + loggedInUser + service), null);}

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}