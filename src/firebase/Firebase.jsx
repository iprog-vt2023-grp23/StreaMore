import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";
import {
  setUsername,
  setUserId,
  updateStreamingServiceList
} from "../features/userPage/userPageSlice";
import FirebaseApp from "/src/FirebaseConfig.jsx";
import { getAuth, onAuthStateChanged } from "@firebase/auth";


import { listenerMiddleware } from "../model/store";
import { updateMovieLists, addNewMovieList,addMovieToMovieList, } from "../features/userLists/myListsSlice";



const auth = getAuth(FirebaseApp);
const database = getDatabase();

export default function Firebase() {


  listenerMiddleware.startListening({
    actionCreator: addMovieToMovieList,
    effect: async(action, listenerApi) => {
      console.log("Movie added", action.payload)
      const {listName, movie} = action.payload;
      const state = listenerApi.getState();
      set(ref(database, "movieLists/" + state.userPage.userId +"/" + listName +"/movies/" + movie.imdbId), movie);
    },
  })
  listenerMiddleware.startListening({
    actionCreator: addNewMovieList,
    effect: async(action, listenerApi) => {
      const state = listenerApi.getState();
      console.log("Movie list added", action.payload, state.userPage.userId)
      set(ref(database, "movieLists/" + state.userPage.userId + "/" + action.payload), {name: action.payload, movies: []})
    }
  })

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
        const newuserId = user.uid;
        const username = user.displayName;
        console.log("auth state", newuserId);
        console.log("Username", username);
        if (username) dispatch(setUsername(username));
        dispatch(setUserId(newuserId));

        onValue(ref(database, "movieLists/" + newuserId), (data) => {
          console.log("Movie list fetched", data.val())
          const lists = data.val();
          dispatch(updateMovieLists(lists));
        }, {
          onlyOnce: true
        });
        
        onValue(ref(database, "serviceList/" + newuserId), (data) => {
          console.log("Service list fetched", data.val())
          const lists = data.val();
          dispatch(updateStreamingServiceList(lists));
        }, {
          onlyOnce: true
        });




/*
        onChildAdded(ref(database, "serviceList/" + userId), (data) => {
          dispatch(addStreamingService(data.val()));
        });
        
        onChildRemoved(ref(database, "serviceList/" + userId), (data) => {
          dispatch(removeStreamingService(data.val()));
        });
        */
      } else {
        // User is signed out
        dispatch(setUserId(null));
      }
    });
  }, []);
}
