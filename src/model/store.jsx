import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchPage/searchSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import userPageReducer from "../features/userPage/userPageSlice";
import movieListReducer from "../features/movieList/movieListSlice";
import selectedMovieReducer from "../features/inspectMovie/inspectMovieSlice";
import firebaseReducer from "../firebase/firebaseSlice"

export const store = configureStore({
  reducer: {
    results: searchReducer,
    sidebar: sidebarReducer,
    movieList: movieListReducer,
    userPage: userPageReducer,
    selectedMovie: selectedMovieReducer,
    firebase: firebaseReducer,
  },
});
