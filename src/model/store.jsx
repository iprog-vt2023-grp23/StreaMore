import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchPage/searchSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import userPageReducer from "../features/userPage/userPageSlice";
import userListsReducer from "../features/userLists/userListsSlice";
import movieListsReducer from "../features/userLists/movieListsSlice";
import selectedMovieReducer from "../features/inspectMovie/inspectMovieSlice";
import firebaseReducer from "../firebase/firebaseSlice"

export const store = configureStore({
  reducer: {
    results: searchReducer,
    sidebar: sidebarReducer,
    movieList: userListsReducer,
    movieLists: movieListsReducer,
    userPage: userPageReducer,
    selectedMovie: selectedMovieReducer,
    firebase: firebaseReducer,
  },
});
