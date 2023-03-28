import Search from "./features/searchPage/SearchView";
import UserPage from "./features/userPage/UserPage";
import MovieList from "./features/movieList/MovieList";
import InspectMoviePresenter from "./features/inspectMovie/InspectMoviePresenter";
//import { fetchFromFirebase, pushToFirebase } from "./firebase/Firebase";
import { useEffect } from "react";
import { FirebaseContext } from './firebase/Firebase';
import { useContext } from "react";
import { useSelector } from "react-redux";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Sidebar from "./features/sidebar/Sidebar";

function App() {
  const { app, api } = useContext(FirebaseContext);
  const movieList = useSelector(state => state.movieList.movieList);

  /*
  *Gets the movie list and streaming services from firebase
  */
  useEffect(( ) => {
      api.getMovieList();
      api.getServices();
  }, [])

  return (
    <div className="App">
      {/*BrowserRouter is a wrapper class that handles navigation, it enables the use of NavLink*/}
      <BrowserRouter>
        {/*Routes contains all Route elements*/}
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/movieList" element={<MovieList />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/inspectMovie" element={<InspectMoviePresenter />} />
        </Routes>
        {/*Sidebar is outside of the Routes since it will always be visible*/}
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
