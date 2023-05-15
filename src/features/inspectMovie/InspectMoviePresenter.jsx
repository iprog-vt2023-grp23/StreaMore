import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  getSelectedMovie,
  toggleAboutFilmField,
  getAboutFilmField,
  selectMovieToInspect,
} from "./inspectMovieSlice";
import {
  addMovieToMovieList,
  addNewMovieList,
  getMovieLists
} from "../userLists/myListsSlice";
import { useNavigate } from "react-router-dom";
import InspectMovieView from "./InspectMovieView";
import MovieCardView from "../movieCards/MovieCardView";
// import MovieCardListView from "../movieCards/MovieCardListView";
import BacknHomeButton from "../uiComponents/BacknHomeButton";
import iconMapping from "../uiComponents/StreamingButtons";
import "./InspectMovie.css";
import AddToListMenuPresenter from "../searchPage/AddToListMenuPresenter";
import { getAuth } from "firebase/auth";
import FirebaseApp from "../../FirebaseConfig";

const InspectMoviePresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = getAuth(FirebaseApp).currentUser;
  const selectedMovie = useSelector(getSelectedMovie);
  const aboutFilmField = useSelector(getAboutFilmField);
  const movieList = useSelector(getMovieLists)
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);

  const onAddNewMovieList = (listName) => {
    dispatch(addNewMovieList(listName));
  };
  const onAddMovieToList = (listName, movie) => {
    dispatch(addMovieToMovieList({ listName, movie }));
  };
  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };

  const onPlusButtonClick = (movie) => {
    setShowAddToListMenu((prevState) => !prevState);
    selectMovie(movie);
  };

  const streamingButtons = () => 
  {
    if (Object.keys(selectedMovie.streamingInfo).length > 0) {
    const services = Object.entries(Object.values(selectedMovie.streamingInfo)[0]);
    return services.map((service) => {
    return <a href={service[1][0].link} key={service[0]} target="_blank" rel="noopener noreferrer">{iconMapping(service[0])}</a>
  })
  }
  else return <><br/>No streaming services</>;
}

  //If user has not clicked a movie/reloaded the page only a back button will be shown (untill persistence is done)
  if (selectedMovie)
    return (
      <>
        {showAddToListMenu ? (
          <AddToListMenuPresenter
          setVisible={setShowAddToListMenu}
          onAddNewMovieList={onAddNewMovieList}
          movieLists={movieList}
          onAddMovieToList={onAddMovieToList}
          movie={selectedMovie}
          />
        ) : null}

        <BacknHomeButton />
        <div className="inspectMovie">
          <MovieCardView
            loggedIn={loggedIn}
            onSelectMovie={selectMovie}
            onAddNewMovieList={onAddNewMovieList}
            onAddMovieToList={onAddMovieToList}
            onPlusButtonClick={onPlusButtonClick}
            id={selectedMovie.imdbId}
            movie={selectedMovie}
            search={true}
            list={false}
          />
          {/*RenderMovie will render the selected movie*/}
          {/* <MovieCardListView movies={[selectedMovie]} /> */}
          {/*Either render the about film button or the about film field depending on if the about button has been pressed*/}

          <InspectMovieView selectedMovie={selectedMovie} serviceLinks={streamingButtons()} />
        </div>
      </>
    );
  else return <BacknHomeButton />;
};

export default InspectMoviePresenter;
