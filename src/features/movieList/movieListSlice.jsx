import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  movieList: [],
};

/*
Implement a function that fetches movieList from server at login
*/

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    addMovieToList(state, action) {
      state.movieList.push(action.payload);
    },
    removeMovieFromList(state, action) {
      state.movieList = state.movieList.filter(
        (movie) => movie.imdbId != action.payload.imdbId
      );
    },
    updateMovieList(state, action) {
      state.movieList = action.payload;
    }
  },
});

//exports for getting the values in state
export const getMovieList = (state) => state.movieList.movieList;

//exports for getting the actions in the slice reducer
export const { addMovieToList, removeMovieFromList, updateMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;
