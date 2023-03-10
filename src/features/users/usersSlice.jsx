import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

function treatHTTPResponseACB(response){ 
    if(!response.ok) throw new Error("API problem "+response.status);  
    return response.json(); 
}

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
    return await fetch(USERS_URL).then(treatHTTPResponseACB).then((data) => {return data;})
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;