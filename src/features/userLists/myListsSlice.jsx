import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  movieLists: [],
  selectedList: null,
};

const myListsSlice = createSlice({
  name: "movieLists",
  initialState,
  reducers: {
    addNewMovieList(state, action) {
      state.movieLists.push({name: action.payload, movies: []});
    },
    removeMovieList(state, action) {
        state.movieLists = state.movieLists.filter(
            (list) => list.name !== action.payload.name
        )
    },
    selectMovieList(state, action) {
      state.selectedList = action.payload;
    },
    addMovieToMovieList(state, action) { 
        state.movieLists = state.movieLists.map((list) => {
            if(list.name === action.payload.listName) {
                if(list.movies === undefined){
                    list.movies = [];
                }
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
      const lists = Object.values(action.payload).map((list) => {
        if(list.movies){
          return {name: list.name, movies: Object.values(list.movies)}
        }
        else
          return {name:list.name, movies: []}
        
      })
      state.movieLists = lists;
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
export const { addNewMovieList, removeMovieList, addMovieToMovieList, removeMovieFromMovieList, updateMovieLists, selectMovieList} = myListsSlice.actions;

export default myListsSlice.reducer;
