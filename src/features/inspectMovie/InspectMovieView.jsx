import "./InspectMovie.css";

const InspectMovieView = (props) => {
  const renderCast = (selectedMovie) => {
    if(!selectedMovie){
      return;
    }
    if(!selectedMovie.cast){
      return;
    }
    const cast = selectedMovie.cast.slice(0, 5);
    return cast.map((actor) => {
      return <div key={actor}>{actor}</div>;
    });
  };


  return (
    <div className="aboutText">
      {props.selectedMovie && <>
        Available on:
        <div className="availableStreamingServices">
        {props.serviceLinks}</div>
        <div className="generalMovieInfo">
          {props.selectedMovie.imdbRating && <div>Rating: {props.selectedMovie.imdbRating}</div>}
          {props.selectedMovie.year && <div>Year: {props.selectedMovie.year}</div>}
          {props.selectedMovie.cast && <div>Top Cast: {renderCast(props.selectedMovie)}</div>}
          {props.selectedMovie.directors && <div>Director: {props.selectedMovie.directors}</div>}
        </div>
        <div className="movieOverview">Overview: {props.selectedMovie.overview}</div>

      </>
      }
    </div>
  );
};

export default InspectMovieView;
