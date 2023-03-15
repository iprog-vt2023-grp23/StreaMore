import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName: 'Gabriel',
    movieList: [],
    streamingServices: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addMovieToList(state, action){
            state.movieList.unshifts(action.payload);
        },
        addStreamingService(state, action){
            state.streamingServices.push(action.payload);
        },
        removeStreamingService(state, action){
            
        }
    }
})
export const getUserName = (state) => state.user.userName;
export const getMovieList = (state) => state.user.movieList;
export const getStreamingServices = (state) => state.user.streamingServices;

//export const {} = userSlice.actions;

export default userSlice.reducer;