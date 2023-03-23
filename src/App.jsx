import { useState } from 'react'
import SearchList from './features/searchBar/SearchList'
import SearchBar from './features/searchBar/SearchBar'
import Search from './features/searchBar/Search'
import UserPage from './features/userPage/UserPage'
import MovieList from './features/movieList/MovieList'
import InspectMovie from './features/inspectMovie/InspectMovie'

import { Route, Routes,BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Sidebar from './features/sidebar/Sidebar'
import PrivateRoute from './features/signIn/PrivateRoute'
import SignIn from './features/signIn/SignIn'



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/movieList" element={<Switch><PrivateRoute><MovieList /></PrivateRoute></Switch>} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/inspectMovie" element={<InspectMovie />} />
        </Routes>
        <Sidebar />
      </BrowserRouter>
    </div>
  )
}

export default App
