import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    movieList: [],
}

/*
Implement a function that fetches movieList from server at login
*/

const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        addMovieToList(state, action){
            state.movieList.unshifts(action.payload);
        },
        removeMovieFromList(state, action){
            state.movieList = state.movieList.filter((movie) => movie != action.payload);
        }
    }
})
export const getMovieList = (state) => state.movieList.movieList;

export const {addMovieToList, removeMovieFromList} = movieListSlice.actions;

export default movieListSlice.reducer;