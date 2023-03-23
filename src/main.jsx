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
import firebaseConfig from './FirebaseConfig';


//Uses getServices from userPageSlice to fetch all streaming services from the API once during page load
store.dispatch(getServices());

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