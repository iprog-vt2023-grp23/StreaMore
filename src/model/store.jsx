import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import searchReducer from "../features/searchPage/searchSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import userPageReducer from "../features/userPage/userPageSlice";
// import userListsReducer from "../features/userLists/userListsSlice";
import movieListsReducer from "../features/userLists/myListsSlice";
import selectedMovieReducer from "../features/inspectMovie/inspectMovieSlice";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    results: searchReducer,
    sidebar: sidebarReducer,
    // movieList: userListsReducer,
    movieLists: movieListsReducer,
    userPage: userPageReducer,
    selectedMovie: selectedMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
