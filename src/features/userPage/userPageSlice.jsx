import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { sourceUrl, options } from "../../ApiKey";
import streamingServices from "../uiComponents/streamingServices";

const initialState = {
  username: null,
  userId: null,
  useremail: null,
  ownedServices: [],
  services: streamingServices,
  editing: false,
};

// TODO: Implement a function that fetches streamingServices and username from server at login

/*
 *Fetches all available streaming services that the api can handle.
 *Might be better to simply have a predetermined list to avoid extra api call.
 *EDIT Currently not used, instead streamingServices is used

 StreamingServices = User's selection
 Services = list of all possible services that can be selected
 */
export const getServices = createAsyncThunk(
  "userPage/getServices",
  async () => {
    const url = sourceUrl.concat("v2/services");
    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.error("error:" + err));
    return response;
  }   
);

const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    setUsername(state, action) {
      console.log("setting username:", action.payload);
      state.username = action.payload;
    },
    setUserEmail(state, action) {
      console.log("setting userEmail to:", action.payload);
      state.useremail = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
      console.log("userID", action.payload)
    },
    addStreamingService(state, action) {
      state.ownedServices.push(action.payload);
    },
    removeStreamingService(state, action) {
      state.ownedServices = state.ownedServices.filter(
        (service) => service != action.payload
      );
    },
    toggleEdit(state, action) {
      state.editing = !state.editing;
    },
    updateStreamingServiceList(state, action) {
      state.ownedServices = action.payload;
      //console.log("fetching onwed services", state.ownedServices, "should equal", action.payload);
    },
  },
  //Extrareducer for when the services are fetched
  extraReducers(builder) {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = Object.keys(action.payload.result);
      state.ownedServices = Object.keys(action.payload.result);
    });
  },
});
export const getStreamingServices = (state) => state.userPage.ownedServices;
export const getAvailableServices = (state) => state.userPage.services;
export const getEditmode = (state) => state.userPage.editing;
export const getUsername = (state) => state.userPage.username;
export const getUserId = (state) => state.userPage.userId;
export const getUserEmail = (state) => state.userPage.useremail;

export const { updateStreamingServiceList, setUsername, setUserEmail, setUserId, addStreamingService, removeStreamingService, toggleEdit } =
  userPageSlice.actions;

export default userPageSlice.reducer;
