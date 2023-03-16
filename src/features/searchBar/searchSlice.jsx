import { createSlice, nanoid, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import country_codes_array from "./CountryCodes";
import {options, sourceUrl} from "../../ApiKey";

const initialState = {
    results: [],
    //countries: Object.values(country_codes_array).map((country) => country.toLowerCase()),
    //countries: Object.values(country_codes_array),
    country: 'se',
    keyword: '',
    status: 'idle',
    error: null
}

export const searchFilms = createAsyncThunk('searchBar/searchFilms', async (params) => {
    const url = sourceUrl.concat('v2/search/title?', params.join('&'))

    console.log("url",url);
    const response = await fetch(url, options)
	.then(res => res.json())
	.then(json => {return json})
	.catch(err => console.error('error:' + err));
    console.log("response", response);
    return response;
})

const searchSlice = createSlice({
    name: 'searchResulst',
    initialState,
    reducers: {
        reducer(state, action){
            state.results.unshift(action.payload)
        },
        setStateCountry(state, action){
            state.country = action.payload;
        },
        setStateKeyword(state, action){
            state.keyword = action.payload;
        },
        prepare(title, content){
            return{
                payload: {
                    id: nanoid(),
                    title,
                    content,
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(searchFilms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(searchFilms.fulfilled, (state, action) => {
                console.log("succeeded", action.payload.result)

                state.status = 'succeeded';
                state.results = action.payload.result;
                state.results.sort()
                console.log("succeeded", state.results)

            })
            .addCase(searchFilms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log("error", state.error);
            })
    }

})

export const selectAllResults = (state) => state.results.results;
export const getResultsStatus = (state) => state.results.status;
export const getResultsError = (state) => state.results.error;
//export const getCountries = (state) => state.results.countries;
export const getCountry = (state) => state.results.country;
export const getKeyword = (state) => state.results.keyword;

export const {setStateCountry, setStateKeyword} = searchSlice.actions;
export default searchSlice.reducer;