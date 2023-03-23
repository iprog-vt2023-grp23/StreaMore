import { useNavigate } from "react-router-dom";

const InspectMovieView = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => props.onToggleAboutField()}>Hide</button>
      <ul>
        <li>Rating: {props.selectedMovie.imdbRating}</li>
        <li>Year: {props.selectedMovie.year}</li>
        <li>Cast: {props.selectedMovie.cast[0]}</li>
      </ul>
      {/*navigate(-1) navigated back to previous page*/}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default InspectMovieView;
