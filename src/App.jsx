import { useState } from 'react'
import SearchList from './features/searchBar/SearchList'
import SearchBar from './features/searchBar/SearchBar'
import UserPage from './features/userPage/UserPage'
import MovieList from './features/movieList/MovieList'
import InspectMovie from './features/inspectMovie/InspectMovie'

import { Route, Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
import Sidebar from './features/sidebar/Sidebar'



function App() {
  return (
    <div className='App'>
      {/*BrowserRouter is a wrapper class that handles navigation, it enables the use of NavLink*/}
      <BrowserRouter>
        {/*Routes contains all Route elements*/}
        <Routes>
            {/*Each route may render whichever component that is required, path is the same as the "to=" field in NavLink*/}
            <Route path="/" element={<div>
                                              <SearchBar />
                                              <SearchList />
                                              </div>} />
            <Route path="/movieList" element={<MovieList/>} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/inspectMovie" element={<InspectMovie />} />
        </Routes>
        {/*Sidebar is outside of the Routes since it will always be visible*/}
        <Sidebar />
      </BrowserRouter>
    </div>
  )
}

export default App
