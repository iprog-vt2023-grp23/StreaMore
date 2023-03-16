import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getMovieList } from "./movieListSlice";
import RenderMovieList from "../../renderFunctions/RenderMovieList";


const MovieList = () => {
    const movieList = useSelector(getMovieList);

    //Uses same render as the search list
    const content = movieList.map(result => <RenderMovieList key={result.imdbId} result={result} />);

    return(
        <div>
            {content}
        </div>
    )
}

export default MovieList;