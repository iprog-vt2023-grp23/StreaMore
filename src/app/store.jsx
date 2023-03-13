import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postSlice'
import usersReducer from "../features/users/usersSlice";
import searchReducer from "../features/searchBar/searchSlice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        results: searchReducer,
        posts: postsReducer,
        users: usersReducer,
    }
})