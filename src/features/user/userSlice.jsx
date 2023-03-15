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
        
    }
})
export const getUserName = (state) => state.user.userName;
export const getMovieList = (state) => state.user.movieList;
export const getStreamingServices = (state) => state.user.streamingServices;

//export const {} = userSlice.actions;

export default userSlice.reducer;