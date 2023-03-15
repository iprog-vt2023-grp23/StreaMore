import { createSlice, nanoid, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import options from "../../ApiKey";

const sourceUrl = 'https://streaming-availability.p.rapidapi.com/';

const initialState = {
    results: [],
    countries: [],
    country: 'se',
    status: 'idle',
    error: null
}

export const searchFilms = createAsyncThunk('searchBar/searchFilms', async (params) => {
    const url = sourceUrl.concat('search/basic?', params.join('&'))

    console.log("url",url);
    const response = await fetch(url, options)
	.then(res => res.json())
	.then(json => {return json})
	.catch(err => console.error('error:' + err));
    console.log("response", response);
    return response;
})

export const fetchCountries = createAsyncThunk('searchBar/fetchCountries', async () => {
    const url = sourceUrl.concat('countries')
    const response = await fetch(url, options)
	.then(res => res.json())
	.then(json => {return json})
	.catch(err => console.error('error:' + err));
    console.log("response1", response);
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
                state.status = 'succeeded';
                state.results = action.payload.results;
                state.results.sort()
                console.log("succeeded", state.results)

            })
            .addCase(searchFilms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log("error", state.error);
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                console.log("countries",action.payload);
                state.countries = action.payload;
            })
    }

})

export const selectAllResults = (state) => state.results.results;
export const getResultsStatus = (state) => state.results.status;
export const getResultsError = (state) => state.results.error;
export const getCountries = (state) => state.results.countries;
export const getStateCountry = (state) => state.results.country;

export const {setStateCountry} = searchSlice.actions;
export default searchSlice.reducer;