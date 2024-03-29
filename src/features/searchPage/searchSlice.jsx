import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { options, sourceUrl } from "../../ApiKey";

const initialState = {
  results: [],
  country: "se",
  keyword: "",
  status: "idle",
  error: null,
};

/**
 * Function to search for films
 * Uses createAsyncThunk to handle the fetch ?asyncronically?
 * Returns the response which is picked up by the extraReducer below
 */
export const searchFilms = createAsyncThunk(
  "searchBar/searchFilms",
  async (params) => {
    const url = sourceUrl.concat("v2/search/title?", params.join("&"));

    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.error("error:" + err));
    return response;
  }
);

export const searchFilmsService = createAsyncThunk(
  "searchBar/searchFilms",
  async (params) => {
    const url = sourceUrl.concat("v2/search/basic?", params.join("&"));
    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.error("error:" + err));
    return response;
  }
);

const searchSlice = createSlice({
  name: "searchResulst",
  initialState,
  reducers: {
    reducer(state, action) {
      state.results.unshift(action.payload);
    },
    setStateCountry(state, action) {
      state.country = action.payload;
    },
    setStateKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
  //Additional reducers to handle the promise of searchFilms
  extraReducers(builder) {
    builder
      .addCase(searchFilms.pending, (state, action) => {
        state.status = "loading";
      })
      //When the promise is fullfilled, add the films to state.results and sort them
      .addCase(searchFilms.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.result) {
          state.results = action.payload.result;
          state.results.sort();
        }
      })
      .addCase(searchFilms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//exports for getting the values in state
export const selectAllResults = (state) => state.results.results;
export const getResultsStatus = (state) => state.results.status;
export const getResultsError = (state) => state.results.error;
export const getCountry = (state) => state.results.country;
export const getKeyword = (state) => state.results.keyword;

//exports for getting the actions in the slice reducer
export const { setStateCountry, setStateKeyword } = searchSlice.actions;
export default searchSlice.reducer;
