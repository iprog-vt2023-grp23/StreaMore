import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded:{
            reducer(state, action){
                state.posts.unshift(action.payload)
            },
            prepare(title, content, userId){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }
            }
        }
    }
})
export const selectAllPosts = (state) => state.posts.posts;
export const {postAdded} = postSlice.actions;

export default postSlice.reducer;