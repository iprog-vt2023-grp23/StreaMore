import { createSlice, nanoid, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

function treatHTTPResponseACB(response){ 
    console.log(response, response.data)
    if(!response.ok) throw new Error("API problem "+response.status);  
    return response.json(); 
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    return await fetch(POSTS_URL).then(treatHTTPResponseACB).then((data) => {return data;})
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const options = {method: "POST", cache: "no-cache", body: initialPost}
    console.log("post",options)
    const response = await fetch(POSTS_URL, options).then(treatHTTPResponseACB).then((data) => {return data;})
    console.log("response", response)
    return response;
})

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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                console.log("hej", state.status)
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                const loadedPosts = action.payload;
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log("error", state.error)

            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                state.posts.push(action.payload);
            })
            
    }
})
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectNewPosts = createSelector(
    [selectAllPosts],
    (posts) => posts
)

export const {postAdded} = postSlice.actions;

export default postSlice.reducer;