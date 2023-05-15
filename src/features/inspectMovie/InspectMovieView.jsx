const InspectMovieView = (props) => {
  return (
    <div>
      <ul>
        <li>Rating: {props.selectedMovie.imdbRating}</li>
        <li>Year: {props.selectedMovie.year}</li>
        <li>Cast: {props.selectedMovie.cast[0]}</li>
      </ul>
    </div>
  );
};

export default InspectMovieView;
