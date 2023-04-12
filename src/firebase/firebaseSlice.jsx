import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
} from "@firebase/auth";
import FirebaseApp from "/src/FirebaseConfig.jsx";
import { getDatabase, ref, set } from "firebase/database";

const initialState = {
  username: null,
  userId: null,
};

const auth = getAuth(FirebaseApp);
const database = getDatabase();

/*
 *Async functions for communicating with the firebase authentication service
 *and the firebase realtime database
 */
export const signIn = createAsyncThunk(
  "firebase/signIn",
  async ({ email, password }) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user.displayName;
  }
);
export const register = createAsyncThunk(
  "firebase/register",
  async ({ email, password, username }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const response = await updateProfile(userCredential.user, {
      displayName: username,
    });
    return username;
  }
);
export const signOutEvent = createAsyncThunk(
  "firebase/signOutEvent",
  async () => {
    signOut(auth);
  }
);
//New
export const removeMovieListFirebase = createAsyncThunk(
  "firebase/removeMovieList",
  async (listName, { getState }) => {
    const state = getState();
    set(ref(database, "movieLists/" + state.firebase.userId + "/" + listName), null);
    return listName;
  }
);

export const removeMovieFromMovieListFirebase = createAsyncThunk(
  "firebase/removeMovieFromMovieList",
  async ({ listName, movie }, { getState }) => {
    const state = getState();
    set(
      ref(
        database,
        "movieLists/" +
          state.firebase.userId +
          "/" +
          listName +
          "/movies/" +
          movie.imdbId
      ),
      null
    );
    return { listName, movie };
  }
);

export const addServiceFirebase = createAsyncThunk(
  "firebase/addService",
  async (service, { getState }) => {
    const state = getState();
    set(
      ref(database, "serviceList/" + state.firebase.userId + "/" + service),
      service
    );
    return service;
  }
);
export const removeServiceFirebase = createAsyncThunk(
  "firebase/removeService",
  async (service, { getState }) => {
    const state = getState();
    set(
      ref(database, "serviceList/" + state.firebase.userId + "/" + service),
      null
    );
    return service;
  }
);

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
  //Extrareducers for handeling the responses of the above functions
  extraReducers(builder) {
    //New
    builder.addCase(removeMovieListFirebase.fulfilled, (state, action) => {
      console.log("Removed movie list", action.payload);
    });
    //New
    builder.addCase(removeMovieFromMovieListFirebase.fulfilled, (state, action) => {
      console.log(
        "Removed movie",
        action.payload.movie.title,
        "from movie list",
        // action.payload.listName
      );
    });
    //Outdated
    // builder.addCase(addMovieFirebase.fulfilled, (state, action) => {
    //   console.log("Added movie", action.payload.title);
    // });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload, "logged in");
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const username = action.payload;
      state.username = username;
      console.log(username, "registered");
    });
    builder.addCase(signOutEvent.fulfilled, (state, action) => {
      console.log("Signed out");
      window.location.reload()
    });
    //Outdated
    // builder.addCase(removeMovieFirebase.fulfilled, (state, action) => {
    //   console.log("Removed movie", action.payload.title);
    // });
    builder.addCase(addServiceFirebase.fulfilled, (state, action) => {
      console.log("Service added", action.payload);
    });
    builder.addCase(removeServiceFirebase.fulfilled, (state, action) => {
      console.log("Service removed", action.payload);
    });
  },
});
export const getUsername = (state) => state.firebase.username;
export const getUserId = (state) => state.firebase.userId;

export const { setUsername, setUserId } = firebaseSlice.actions;

export default firebaseSlice.reducer;
