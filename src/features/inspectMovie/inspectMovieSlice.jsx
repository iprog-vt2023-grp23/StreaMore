import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedMovie: '',
}

/*
Implement a function that fetches movieList from server at login
*/

const inspectMovieSlice = createSlice({
    name: 'inspectMovie',
    initialState,
    reducers: {
        selectMovieToInspect(state, action){
            state.selectedMovie = action.payload;
        },
    }
})
export const getSelectedMovie = (state) => state.selectedMovie.selectedMovie;

export const {selectMovieToInspect} = inspectMovieSlice.actions;

export default inspectMovieSlice.reducer;