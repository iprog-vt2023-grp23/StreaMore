import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { sourceUrl, options } from "../../ApiKey";
import streamingServices from "./streamingServices";

const initialState = {
  ownedServices: [],
  services: streamingServices,
};

/*
Implement a function that fetches streamingServices and username from server at login
*/

/*
 *Fetches all available streaming services that the api can handle.
 *Might be better to simply have a predetermined list to avoid extra api call.
 *EDIT Currently not used, instead streamingServices is used
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
    addStreamingService(state, action) {
      state.ownedServices.push(action.payload);
    },
    updateStreamingServices(state, action) {
      state.ownedServices = action.payload;
    },
    removeStreamingService(state, action) {
      state.ownedServices = state.ownedServices.filter(
        (service) => service != action.payload
      );
    },
  },
  //Extrareducer for when the services are fetched
  extraReducers(builder) {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = Object.keys(action.payload.result);
    });
  },
});
export const getStreamingServices = (state) => state.userPage.ownedServices;
export const getAvailableServices = (state) => state.userPage.services;

export const { addStreamingService, removeStreamingService, updateStreamingServices } =
  userPageSlice.actions;

export default userPageSlice.reducer;
