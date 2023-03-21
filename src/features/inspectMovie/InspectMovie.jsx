import { useSelector, useDispatch } from "react-redux"
import { getSelectedMovie, toggleAboutFilmField, getAboutFilmField } from "./inspectMovieSlice";
import { useNavigate } from "react-router-dom";
import RenderMovie from "../../renderFunctions/RenderMovie";

const InspectMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedMovie = useSelector(getSelectedMovie);
    const aboutFilmField = useSelector(getAboutFilmField)

    //Button which will toggle the about the film field
    const aboutFilmButton = () => {
        if(!aboutFilmField){
            return <button onClick={() => dispatch(toggleAboutFilmField())}>
                About the film
            </button>
        }
        return false
    }

    //If user has not clicked a movie/reloaded the page only a back button will be shown (untill persistence is done)
    if(selectedMovie)
        return (
            <div className="Search">
               {/*RenderMovie will render the selected movie*/}
                <RenderMovie result={selectedMovie}/>
                {/*Either render the about film button or the about film field depending on if the about button has been pressed*/}
                {aboutFilmButton() || 
                <>
                    <button onClick={() => dispatch(toggleAboutFilmField())}>Hide</button>
                    <ul>
                        <li>Rating: {selectedMovie.imdbRating}</li>
                        <li>Year: {selectedMovie.year}</li>
                        <li>Cast: {selectedMovie.cast[0]}</li>   
                    </ul>
                </>}
                {/*navigate(-1) navigated back to previous page*/}
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        )
    else
        return <button onClick={() => navigate(-1)}>Back</button>
}

export default InspectMovie;