import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './app/store';
import { Provider } from 'react-redux';
//import { fetchCountries } from './features/searchBar/searchSlice';
import { getServices } from './features/userPage/userPageSlice';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { configureStore } from 'redux';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from './features/firebase/firebaseReducer';

//Uses getServices from userPageSlice to fetch all streaming services from the API once during page load
store.dispatch(getServices());

const firebaseConfig = {
  apiKey: "AIzaSyByzGBrlFpUXIbh8WrmF6r_WzKX5s6yihY",
  authDomain: "streamore-36a0e.firebaseapp.com",
  projectId: "streamore-36a0e",
  storageBucket: "streamore-36a0e.appspot.com",
  messagingSenderId: "857461114194",
  appId: "1:857461114194:web:a14ba9d3bfce77b9c9268b",
  measurementId: "G-9GW8L8ZENK"
};

const rrconfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// const initialState = {};
// const store = configureStore({rootReducer, initialState});

const rrfProps = {
  firebase,
  config: rrconfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
)