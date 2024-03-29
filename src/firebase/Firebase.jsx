import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  setUsername,
  setUserEmail,
  setUserId,
  updateStreamingServiceList,
  addStreamingService,
  removeStreamingService,
} from "../features/userPage/userPageSlice";
import FirebaseApp from "/src/FirebaseConfig.jsx";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import { listenerMiddleware } from "../model/store";
import {
  updateMovieLists,
  addNewMovieList,
  addMovieToMovieList,
  removeMovieFromMovieList,
  removeMovieList,
} from "../features/userLists/myListsSlice";

const auth = getAuth(FirebaseApp);
const database = getDatabase();

export default function Firebase() {
  const navigate = useNavigate();
  const location = useLocation();

  listenerMiddleware.startListening({
    actionCreator: addMovieToMovieList,
    effect: async (action, listenerApi) => {
      const { listName, movie } = action.payload;
      const state = listenerApi.getState();
      set(
        ref(
          database,
          "movieLists/" +
            state.userPage.userId +
            "/" +
            listName +
            "/movies/" +
            movie.imdbId
        ),
        movie
      );
    },
  });
  listenerMiddleware.startListening({
    actionCreator: removeMovieFromMovieList,
    effect: async (action, listenerApi) => {
      const { name, movie } = action.payload;
      const state = listenerApi.getState();
      set(
        ref(
          database,
          "movieLists/" +
            state.userPage.userId +
            "/" +
            name +
            "/movies/" +
            movie.imdbId
        ),
        null
      );
    },
  });
  listenerMiddleware.startListening({
    actionCreator: addNewMovieList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      set(
        ref(
          database,
          "movieLists/" + state.userPage.userId + "/" + action.payload
        ),
        { name: action.payload, movies: [] }
      );
    },
  });
  listenerMiddleware.startListening({
    actionCreator: removeMovieList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      set(
        ref(
          database,
          "movieLists/" + state.userPage.userId + "/" + action.payload
        ),
        null
      );
    },
  });
  listenerMiddleware.startListening({
    actionCreator: addStreamingService,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      const usersServices = state.userPage.ownedServices.reduce(
        (val, i) => ((val[i] = "" + i), val),
        {}
      ); //convert array->obj
      set(ref(database, "serviceList/" + state.userPage.userId), usersServices);
    },
  });
  listenerMiddleware.startListening({
    actionCreator: removeStreamingService,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      set(
        ref(
          database,
          "serviceList/" + state.userPage.userId + "/" + action.payload
        ),
        null
      );
    },
  });

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
        const useremail = user.email;
        const username = user.displayName;
        if (username) dispatch(setUsername(username));
        dispatch(setUserId(newuserId));
        dispatch(setUserEmail(useremail));

        onValue(
          ref(database, "movieLists/" + newuserId),
          (data) => {
            const lists = data.val();
            if (lists) dispatch(updateMovieLists(lists));
          },
          {
            onlyOnce: true,
          }
        );

        onValue(
          ref(database, "serviceList/" + newuserId),
          (data) => {
            if (data.val()) {
              const lists = Object.keys(data.val()); //convert obj->array
              dispatch(updateStreamingServiceList(lists));
            }
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        // User is signed out
        dispatch(setUserId(null));
        if (location.pathname != "/") navigate("/signIn");
      }
    });
  }, []);
}
