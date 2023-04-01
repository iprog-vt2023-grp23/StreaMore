import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  ref,
  onChildRemoved,
} from "firebase/database";
//Old
import {
  addMovieToList,
  removeMovieFromList,
} from "/src/features/userLists/userListsSlice";
import {
  addStreamingService,
  removeStreamingService,
} from "../features/userPage/userPageSlice";
//New
import {
  addNewMovieList,
  deleteMovieList,
  addMovieToMovieList,
  removeMovieFromMovieList,
  updateMovieLists
} from "/src/features/userLists/movieListsSlice";




import { setUsername, setUserId } from "./firebaseSlice";
import FirebaseApp from "/src/FirebaseConfig.jsx";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const auth = getAuth(FirebaseApp);
const database = getDatabase();

export default function Firebase() {
  const dispatch = useDispatch();

  useEffect(() => {
    //Checks wether the authentication state has changed and executes code
    onAuthStateChanged(auth, (user) => {
      if (user) {
        /*
         *User is signed in and actions should be taken
         *Username and userId are set
         *Firebase listeners are added which listens to changes in the database
         */
        const userId = user.uid;
        const username = user.displayName;
        console.log("auth state", userId);
        console.log("Username", username);
        if (username) dispatch(setUsername(username));
        dispatch(setUserId(userId));

        const movieListsRef = ref(database, "movieLists/" + userId);
        onChildAdded(movieListsRef, (data) => {
          dispatch(addNewMovieList(data.val()));
        });
        onChildRemoved(movieListsRef, (data) => {
          dispatch(deleteMovieList({ name: data.key }));
        });
        onChildChanged(movieListsRef, (data) => {
          const listName = data.key;
          const updatedList = data.val();
          dispatch(updateMovieLists({ [listName]: updatedList }));
        });






        //Outdated movieList 
        onChildAdded(ref(database, "movieList/" + userId), (data) => {
          dispatch(addMovieToList(data.val()));
        });
        onChildAdded(ref(database, "serviceList/" + userId), (data) => {
          dispatch(addStreamingService(data.val()));
        });
        //Outdated movieList 
        onChildRemoved(ref(database, "movieList/" + userId), (data) => {
          dispatch(removeMovieFromList(data.val()));
        });
        onChildRemoved(ref(database, "serviceList/" + userId), (data) => {
          dispatch(removeStreamingService(data.val()));
        });
      } else {
        // User is signed out
        dispatch(setUserId(null));
      }
    });
  }, []);
}
