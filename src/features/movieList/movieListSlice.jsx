import { createSlice, current } from "@reduxjs/toolkit"

import React, { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const initialState = {
    movieList: movieLists(),
}

/*
Implement a function that fetches movieList from server at login
*/

const movieLists = () => {
    const { displayName, uid } = useSelector((state) => state.firebase.auth);
    console.log("Fetching movieList from server for user: " + displayName);
    useFirestoreConnect({
        collection: "users/${uid}/movieList",
        storeAs: "movieList",
    });
    const movieList = useSelector((state) => state.firestore.data.movieList);
    console.log(movieList);
    return movieList;
}

const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        addMovieToList(state, action){
            state.movieList.push(action.payload);
            // Push to firebase
            // const [presentMovie, setPresentMovie] = useState("");
            const firestore = useFirestore();
            const { uid } = useSelector((state) => state.firebase.auth);
            // const handleChange = ({ currentTarget: { name, value } }) => {
            //     console.log(name);
            //     setPresentMovie(value);
            // };
            const addNewMovie = (movie) => {
                firestore
                    .collection("users")
                    .doc(uid)
                    .collection("movieList")
                    .add(movie)
                    .then((docRef) => {
                        docRef.update({ movieId: docRef.id });
                    });
                setPresentMovie("");
            };
            addNewMovie(action.payload);

        },
        removeMovieFromList(state, action){
            state.movieList = state.movieList.filter((movie) => movie.title != action.payload.title);
            // Push to firebase
        }
    }
})

//exports for getting the values in state
export const getMovieList = (state) => state.movieList.movieList;

//exports for getting the actions in the slice reducer
export const {addMovieToList, removeMovieFromList} = movieListSlice.actions;

export default movieListSlice.reducer;