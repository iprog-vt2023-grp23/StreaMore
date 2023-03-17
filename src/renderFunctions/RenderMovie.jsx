import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMovieToInspect } from '../features/inspectMovie/inspectMovieSlice';
import { addMovieToList, getMovieList, removeMovieFromList } from '../features/movieList/movieListSlice';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import renderStreamingServices from './RenderStreamingServices';

const RenderMovie = ({result}) => {
    const dispatch = useDispatch();
    const movieList = useSelector(getMovieList);

    const selectMovie = () => {
        dispatch(selectMovieToInspect(result));
    }
    const addToMovieList = () => {
        dispatch(addMovieToList(result));
    }
    const removeFromMovieList = () => {
        dispatch(removeMovieFromList(result));
    }

    const addToListButton = () => {
        if(movieList.includes(result)){
            return( <button onClick={removeFromMovieList}>
                <AiOutlineMinus />
            </button>)
        }
        return(<button onClick={addToMovieList}>
            <AiOutlinePlus />
        </button>)
    }
  return (
    <div className='Search'>
         <NavLink onClick={selectMovie} to="/inspectMovie">
            <h3>{result.title}</h3>
            <div>{result.body}</div>
            <img src={result.posterURLs[154]}></img>
        </NavLink>
        {renderStreamingServices(result)}
        {addToListButton()}
    </div>
  )
}

export default RenderMovie