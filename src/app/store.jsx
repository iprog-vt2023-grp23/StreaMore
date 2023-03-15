import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchBar/searchSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
    reducer: {
        results: searchReducer,
        sidebar: sidebarReducer,
        user: userReducer,
    }
})