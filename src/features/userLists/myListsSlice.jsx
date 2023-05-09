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
      let newName;
      if (state.movieLists.find((list) => list.name === action.payload)) {
        let number = 1;
        newName = action.payload + " (" + number + ")";
        while (state.movieLists.find((list) => list.name === newName)) {
          number++;
          newName = action.payload + " (" + number + ")";
          
        }
      }
      state.movieLists.push({name: newName || action.payload, movies: []});
      // state.movieLists = [...state.movieLists].sort((a, b) => a.name.localeCompare(b.name));
    },
    removeMovieList(state, action) {
        state.movieLists = state.movieLists.filter(
            (list) => list.name !== action.payload
        )
        if (state.movieLists.length > 0){
          state.selectedList = state.movieLists[0].name;
        }
        else{
          state.selectedList = null;
        }
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
                if(list.movies.find((movie) => movie.imdbId === action.payload.movie.imdbId)){
                    return list;
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
