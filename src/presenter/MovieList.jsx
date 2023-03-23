import { useSelector } from "react-redux";
import { getMovieList } from "../model/movieListSlice";
import RenderMovie from "../view/RenderMovie";


const MovieList = () => {
    const movieList = useSelector(getMovieList);

    //Render all movies in movieList using map and the rendermovie function and with imdbId as key for each rendered object
    const content = movieList.map(result => <RenderMovie key={result.imdbId} result={result} />);

    return(
        <div>
            {content}
        </div>
    )
}

export default MovieList;