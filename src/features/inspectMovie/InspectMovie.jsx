import { useSelector, useDispatch } from "react-redux"
import { getSelectedMovie } from "./inspectMovieSlice";
import { NavLink } from "react-router-dom";
import { getCountry } from "../searchBar/searchSlice";
import iconMapping from "../userPage/StreamingButtons";
import renderStreamingServices from "../../renderFunctions/RenderStreamingServices";

const InspectMovie = () => {
    const dispatch = useDispatch();
    const selectedMovie = useSelector(getSelectedMovie);

    return (
        <div className="Search">
            <h3>{selectedMovie.originalTitle}</h3>
            <img src={selectedMovie.posterURLs[154]}></img>
            <ul>
                <li>Rating: {selectedMovie.imdbRating}</li>
                <li>Year: {selectedMovie.year}</li>
                <li>Cast: {selectedMovie.cast[0]}</li>
                
            </ul>
            <p className="Search">{renderStreamingServices(selectedMovie)}</p>
            <NavLink to="/">Back</NavLink>
        </div>
    )
}

export default InspectMovie;