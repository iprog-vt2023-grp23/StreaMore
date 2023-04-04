import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  movieLists: [],
};

/*
Implement a function that fetches movieList from server at login
*/

/*

[{name: "My list", movies: [{imdbId: "tt123", title: "Movie title", poster: "poster url"}]}, ...]

*/

const movieListsSlice = createSlice({
  name: "movieLists",
  initialState,
  reducers: {
    addNewMovieList(state, action) {
        state.movieLists.push(action.payload);
    },
    deleteMovieList(state, action) {
        state.movieLists = state.movieLists.filter(
            (list) => list.name !== action.payload.name
        )
    },
    addMovieToMovieList(state, action) { 
        state.movieLists = state.movieLists.map((list) => {
            if(list.name === action.payload.name) {
                list.movies.push(action.payload.movie);
            }
            return list;
        });
    },
    removeMovieFromMovieList(state, action) {
        state.movieLists = state.movieLists.map((list) => {
            if(list.name === action.payload.name) {
                list.movies = list.movies.filter((movie) => movie.imdbId != action.payload.movie.imdbId);
            }
            return list;
        });
    },
    updateMovieLists(state, action) {
        console.log("Updating movie lists")
      state.movieLists = action.payload;
    }
  },
});

//exports for getting the values in state
export const getMovieLists = (state) => state.movieLists.movieLists;

//exports for getting the actions in the slice reducer
export const { addNewMovieList, deleteMovieList, addMovieToMovieList, removeMovieFromMovieList, updateMovieLists} = movieListsSlice.actions;

export default movieListsSlice.reducer;
