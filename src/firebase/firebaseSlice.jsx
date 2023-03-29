import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getAuth } from "@firebase/auth"
import FirebaseApp from "/src/FirebaseConfig.jsx"
import { getDatabase } from "firebase/database";

const initialState = {
  username: null,
  userId: null,
};
const auth = getAuth(FirebaseApp)
const database = getDatabase();

export const signIn = createAsyncThunk(
    'firebase/signIn',
    async ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
    }
)
export const register = createAsyncThunk(
    'firebase/register',
    ({email, password, username}) => {
        console.log(email, password, username)
        createUserWithEmailAndPassword(auth, email, password)
        console.log("hej")
            /*.then((userCredential) => {
                console.log(userCredential)
                updateProfile(userCredential.user, {
                    displayName: username,
                })
                //return userCredential;
            })
            .catch((err) => console.error("error" + err));*/
    }
)
export const signOutEvent = createAsyncThunk(
    'firebase/signOutEvent',
    async () => {
        signOut(auth);
    }
)
export const addMovie = createAsyncThunk(
    'firebase/addMovie',
    async (movie, userId) => {
      const postListRef = ref(database, 'movieList/' + userId + '/' + movie.imdbId);
      set(postListRef, movie)
      return movie;
    }
  );
  export const removeMovie = createAsyncThunk(
    "firebase/removeMovie",
    async (movie, userId) => {
      set(ref(database, 'movieList/' + userId + '/' + movie.imdbId), null);
      return movie;
    }
  );

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setUsername(state, action) {
        state.username = action.payload;
    },
    setUserId(state, action){
        state.userId = action.payload;
    },
  },
  //Extrareducer for when the services are fetched
  extraReducers(builder) {
    builder.addCase(addMovie.fulfilled, (state, action) => {
        console.log("Added movie", action.payload.title);
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
        console.log(action.user.uid, "logged in");
    });
    builder.addCase(register.fulfilled, (state, action) => {
        const username = action;
        console.log(username, "registered");
    });
    builder.addCase(signOutEvent.fulfilled, (state, action) => {
        console.log("Signed out");
        window.location = "/";
    });

    builder.addCase(removeMovie.fulfilled, (state, action) => {
        console.log("Removed movie", action.payload.title);
    });
  },
});
export const getUsername = (state) => state.firebase.username;
export const getUserId = (state) => state.firebase.userId;

export const { setUsername, setUserId } =
  firebaseSlice.actions;

export default firebaseSlice.reducer;
