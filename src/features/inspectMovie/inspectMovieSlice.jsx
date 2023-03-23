import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: "",
  aboutFilmField: false,
};

/*
Implement a function that fetches movieList from server at login
*/

const inspectMovieSlice = createSlice({
  name: "inspectMovie",
  initialState,
  reducers: {
    selectMovieToInspect(state, action) {
      state.selectedMovie = action.payload;
    },
    toggleAboutFilmField(state, action) {
      state.aboutFilmField = !state.aboutFilmField;
    },
  },
});

//exports for getting the values in state
export const getSelectedMovie = (state) => state.selectedMovie.selectedMovie;
export const getAboutFilmField = (state) => state.selectedMovie.aboutFilmField;

//exports for getting the actions in the slice reducer
export const { selectMovieToInspect, toggleAboutFilmField } =
  inspectMovieSlice.actions;

export default inspectMovieSlice.reducer;
