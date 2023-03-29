import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./model/store";
import { Provider } from "react-redux";
//import { fetchCountries } from './features/searchBar/searchSlice';
import Firebase from "./firebase/Firebase";
import { getServices } from "./features/userPage/userPageSlice";


//Uses getServices from userPageSlice to fetch all streaming services from the API once during page load
store.dispatch(getServices());
//fetchFromFirebase();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Firebase />
      <App />
    </Provider>
  </React.StrictMode>
);
