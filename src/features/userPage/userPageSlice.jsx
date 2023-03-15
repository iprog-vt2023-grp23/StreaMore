import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName: 'Gabriel',
    streamingServices: ["netflix"],
}

/*
Implement a function that fetches streamingServices and username from server at login
*/

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
    }
})
export const getUserName = (state) => state.userPage.userName;
export const getStreamingServices = (state) => state.userPage.streamingServices;

export const {setUserName, addStreamingService, removeStreamingService} = userPageSlice.actions;

export default userPageSlice.reducer;