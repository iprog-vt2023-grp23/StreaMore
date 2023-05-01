import { useSelector, useDispatch } from "react-redux";
import {
  getSelectedMovie,
  toggleAboutFilmField,
  getAboutFilmField,
} from "./inspectMovieSlice";
import { useNavigate } from "react-router-dom";
import InspectMovieView from "./InspectMovieView";
// import MovieCardListView from "../movieCards/MovieCardListView";

const InspectMoviePresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedMovie = useSelector(getSelectedMovie);
  const aboutFilmField = useSelector(getAboutFilmField);

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

  //If user has not clicked a movie/reloaded the page only a back button will be shown (untill persistence is done)
  if (selectedMovie)
    return (
      <div className="Search">
        {/*RenderMovie will render the selected movie*/}
        {/* <MovieCardListView movies={[selectedMovie]} /> */}
        {/*Either render the about film button or the about film field depending on if the about button has been pressed*/}
        {aboutFilmButton() || (
          <InspectMovieView
            onToggleAboutField={dispatch(toggleAboutFilmField())}
            selectedMovie={selectedMovie}
          />
        )}
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  else return <button onClick={() => navigate(-1)}>Back</button>;
};

export default InspectMoviePresenter;
