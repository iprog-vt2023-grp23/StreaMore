import { useState } from 'react'
import SearchList from './features/searchBar/SearchList'
import SearchBar from './features/searchBar/SearchBar'
import UserPage from './features/user/UserPage'
import MovieList from './features/movieList/MovieList'

import { Route, Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
import Sidebar from './features/sidebar/Sidebar'



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path="/search" element={<div>
                                              <SearchBar />
                                              <SearchList />
                                              </div>} />
            <Route path="/movieList" element={<MovieList/>} />
            <Route path="/userPage" element={<UserPage />} />
        </Routes>
        <Sidebar />
      </BrowserRouter>
    </div>
  )
}

export default App
