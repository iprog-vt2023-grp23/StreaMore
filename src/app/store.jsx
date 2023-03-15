import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchBar/searchSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice"

export const store = configureStore({
    reducer: {
        results: searchReducer,
        sidebar: sidebarReducer,
    }
})