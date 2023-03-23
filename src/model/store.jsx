import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import sidebarReducer from "./sidebarSlice"
import userPageReducer from "./userPageSlice"
import movieListReducer from "./movieListSlice"
import selectedMovieReducer from "./inspectMovieSlice"

export const store = configureStore({
    reducer: {
        results: searchReducer,
        sidebar: sidebarReducer,
        movieList: movieListReducer,
        userPage: userPageReducer,
        selectedMovie: selectedMovieReducer,
    }
})