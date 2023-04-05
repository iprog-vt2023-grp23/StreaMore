import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  movieLists: [],
  selectedList: null,
};

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
    selectMovieList(state, action) {
      state.selectedList = action.payload;
    },
    addMovieToMovieList(state, action) { 
        state.movieLists = state.movieLists.map((list) => {
            if(list.name === action.payload.name) {
                if(list.movies === undefined){
                    list.movies = [];
                }
                console.log(action.payload);
                list.movies.push(action.payload.movies);
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
        console.log("updateMovieLists", action.payload);
        const { name, movies } = action.payload;
        state.movieLists = state.movieLists.map((list) => {
          if (list.name === name) {
            list.movies = movies;
          }
          return list;
        });
      }

    //   updateMovieLists(state, action) {
    //     console.log("updateMovieLists", action.payload);
    //     const listName = Object.keys(action.payload)[0];
    //     const updatedList = action.payload[listName];
      
    //     state.movieLists = state.movieLists.map((list) => {
    //       if (list.name === listName) {
    //         list.movies = updatedList.movies;
    //       }
    //       return list;
    //     });
    //   }
  },
});

//exports for getting the values in state
export const getMovieLists = (state) =>  state.movieLists.movieLists;
export const getSelectedList = (state) => state.movieLists.selectedList;

//exports for getting the actions in the slice reducer
export const { addNewMovieList, deleteMovieList, addMovieToMovieList, removeMovieFromMovieList, updateMovieLists, selectMovieList} = movieListsSlice.actions;

export default movieListsSlice.reducer;
