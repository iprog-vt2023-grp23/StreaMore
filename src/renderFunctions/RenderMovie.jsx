import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMovieToInspect } from '../features/inspectMovie/inspectMovieSlice';
import { addMovieToList, getMovieList, removeMovieFromList } from '../features/movieList/movieListSlice';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import renderStreamingServices from './RenderStreamingServices';

/*
*A reusable function used for rendering a movie, is used in the movie list as well as the searchList and InspectMovie
*/
const RenderMovie = ({result}) => {
    const dispatch = useDispatch();
    const movieList = useSelector(getMovieList);

    //Selects a clicked movie for inspection
    const selectMovie = () => {
        dispatch(selectMovieToInspect(result));
    }

    /*
    *Adds and removes a rendered movie to and from the user movie list
    */
    const addToMovieList = () => {
        dispatch(addMovieToList(result));
    }
    const removeFromMovieList = () => {
        dispatch(removeMovieFromList(result));
    }

    /*
    *A button that removes the rendered movie from the movie list if it is in the list
    *Or a button that adds the rendered movie to the movie list if it is not in the list
    */
    const addToListButton = () => {
        if(movieList.includes(result)){
            return( <button onClick={removeFromMovieList}>
                -
            </button>)
        }
        return(<button onClick={addToMovieList}>
            +
        </button>)
    }
  //Renders a clickable movie, the onclick will navigate to inspectMovie where the clicked movie will be displayed
  return (
    <div>
        {/*Stylas i SearchList.css*/}
         <NavLink onClick={selectMovie} to="/inspectMovie">
            <h3>{result.title}</h3>
            <div>{result.body}</div>
            <img src={result.posterURLs[154]}></img>
        </NavLink>
        {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
        {addToListButton()}
    </div>
  )
}

export default RenderMovie