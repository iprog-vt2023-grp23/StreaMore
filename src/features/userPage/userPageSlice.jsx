import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { sourceUrl, options } from "../../ApiKey";

const initialState = {
  userName: null,
  streamingServices: [],
  services: [],
};

/*
Implement a function that fetches streamingServices and username from server at login
*/

/*
 *Fetches all available streaming services that the api can handle.
 *Might be better to simply have a predetermined list to avoid extra api call.
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
    setUserName(state, action) {
      console.log(current(state).userName)
      state.userName = action.payload;
      console.log(current(state).userName)

    },
    addStreamingService(state, action) {
      state.streamingServices.push(action.payload);
    },
    updateStreamingServices(state, action) {
      state.streamingServices = action.payload;
    },
    removeStreamingService(state, action) {
      state.streamingServices = state.streamingServices.filter(
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
export const getUserName = (state) => state.userPage.userName;
export const getStreamingServices = (state) => state.userPage.streamingServices;
export const getAvailableServices = (state) => state.userPage.services;

export const { setUserName, addStreamingService, removeStreamingService, updateStreamingServices } =
  userPageSlice.actions;

export default userPageSlice.reducer;
