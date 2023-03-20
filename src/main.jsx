import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './app/store';
import { Provider } from 'react-redux';
//import { fetchCountries } from './features/searchBar/searchSlice';
import { getServices } from './features/userPage/userPageSlice';

//store.dispatch(fetchCountries());
store.dispatch(getServices());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)