import "./InspectMovie.css";

const InspectMovieView = (props) => {
  return (
    <div className="aboutText">
        <p>Rating: {props.selectedMovie.imdbRating}</p>
        <p>Year: {props.selectedMovie.year}</p>
        <p>Cast: {props.selectedMovie.cast[0]}</p>
        <p>Director: {props.selectedMovie.directors}</p>
        <p>Overview: {props.selectedMovie.overview}</p>
        Available on:
        {props.serviceLinks}
    </div>
  );
};

export default InspectMovieView;
