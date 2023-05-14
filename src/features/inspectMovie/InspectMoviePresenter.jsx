import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  getSelectedMovie,
  toggleAboutFilmField,
  getAboutFilmField,
  selectMovieToInspect
} from "./inspectMovieSlice";
import { addMovieToMovieList, addNewMovieList } from "../userLists/myListsSlice";
import { useNavigate } from "react-router-dom";
import InspectMovieView from "./InspectMovieView";
import MovieCardView from "../movieCards/MovieCardView";
// import MovieCardListView from "../movieCards/MovieCardListView";
import BacknHomeButton from "../uiComponents/BacknHomeButton";
import "./InspectMovie.css";

const InspectMoviePresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedMovie = useSelector(getSelectedMovie);
  const aboutFilmField = useSelector(getAboutFilmField);
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);

  const onAddNewMovieList = (listName) => {
    dispatch(addNewMovieList( listName ));
  };
  const onAddMovieToList = (listName, movie) => {
    dispatch(addMovieToMovieList({ listName, movie }));
  };
  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };

  //Button which will toggle the about the film field
  const aboutFilmButton = () => {
    if (!aboutFilmField) {
      return (
        <button onClick={() => dispatch(toggleAboutFilmField())}>
          About the film
        </button>
      );
    }
    return false;
  };

  const getItems = (movie) => {
    return [
      {
        label: "Add",
        icon: "pi pi-plus",
        command: () => {
          console.log("Add movie to listen")
          setShowAddToListMenu(prevState => !prevState);
        }
      },
      {
        label: "Notify",
        icon: "pi pi-bell",
        command: () => {
          console.log("Notify user plis");
        }
      }
    ] 
  }

  //If user has not clicked a movie/reloaded the page only a back button will be shown (untill persistence is done)
  if (selectedMovie)
    return (
      <>
        {showAddToListMenu ? <AddToListMenuView setVisible={setShowAddToListMenu} 
        onAddNewMovieList={onAddNewMovieList} 
        movieLists={movieList} 
        onAddMovieToList={onAddMovieToList}
        movie={selectedMovie}/> : null}

      <BacknHomeButton />
      <div className="inspectMovie">
      <MovieCardView 
          getItems={getItems}
          onSelectMovie={selectMovie}
          onAddNewMovieList={onAddNewMovieList}
          onAddMovieToList={onAddMovieToList}
          id={selectedMovie.imdbId}
          movie={selectedMovie}
          search={false}
          list={false}
        />
        {/*RenderMovie will render the selected movie*/}
        {/* <MovieCardListView movies={[selectedMovie]} /> */}
        {/*Either render the about film button or the about film field depending on if the about button has been pressed*/}
        {aboutFilmButton() || (
          <InspectMovieView
            onToggleAboutField={dispatch(toggleAboutFilmField())}
            selectedMovie={selectedMovie}
          />
        )}
      </div>
      </>
    );
  else return <BacknHomeButton />;
};

export default InspectMoviePresenter;
