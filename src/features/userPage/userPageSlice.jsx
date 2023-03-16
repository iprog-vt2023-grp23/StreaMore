import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sourceUrl, options } from "../../ApiKey"

const initialState = {
    userName: 'Gabriel',
    streamingServices: ["netflix"],
    services: [],
}

/*
Implement a function that fetches streamingServices and username from server at login
*/

export const getServices = createAsyncThunk('userPage/getServices', async () => {
    const url = sourceUrl.concat('v2/services')

    console.log("url",url);
    const response = await fetch(url, options)
	.then(res => res.json())
	.then(json => {return json})
	.catch(err => console.error('error:' + err));
    console.log("getServices", response);
    return response;
})

const userPageSlice = createSlice({
    name: 'userPage',
    initialState,
    reducers: {
        setUserName(state, action){
            state.userName = action.payload;
        },
        addStreamingService(state, action){
            state.streamingServices.push(action.payload);
        },
        removeStreamingService(state, action){
            state.streamingServices = state.streamingServices.filter((service) => service != action.payload);
        }
    },
    extraReducers(builder){
        builder
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = Object.keys(action.payload.result);
            })
        }
})
export const getUserName = (state) => state.userPage.userName;
export const getStreamingServices = (state) => state.userPage.streamingServices;
export const getAvailableServices = (state) => state.userPage.services;

export const {setUserName, addStreamingService, removeStreamingService} = userPageSlice.actions;

export default userPageSlice.reducer;