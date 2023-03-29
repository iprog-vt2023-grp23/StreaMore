import React from "react";
import { NavLink } from "react-router-dom";

import { SpeedDial } from 'primereact/speeddial';
import PrimeReact from 'primereact/api';
import "./MovieView.css";

PrimeReact.appendTo = 'self';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

/*
 *A reusable function used for rendering a movie, is used in the movie list as well as the searchList and InspectMovie
 */
const MovieView = (props) => {
  //const movieList = useSelector(getMovieList);

  //Selects a clicked movie for inspection
  const selectMovie = () => {
    props.onSelectMovie(props.movie);
    //dispatch(selectMovieToInspect(result));
  };

  /*
   *Adds and removes a rendered movie to and from the user movie list
   */
  const addToMovieList = () => {
    props.onAddToMovieList(props.movie);
    //dispatch(addMovieToList(result));
  };
  const removeFromMovieList = () => {
    props.onRemoveToMovieList(props.movie);
    //dispatch(removeMovieFromList(result));
  };

  /*
   *A button that removes the rendered movie from the movie list if it is in the list
   *Or a button that adds the rendered movie to the movie list if it is not in the list
   */
  const addToListButton = () => {
    if (props.movieList.includes(props.movie)) {
      return <button onClick={removeFromMovieList}>-</button>;
    }
    return <button onClick={addToMovieList}>+</button>;
  };

  const items = [
    {
      label: "Add",
      icon: "pi pi-plus",
      command: () => {
        addToMovieList();
      }
    },
    {
      label: "Remove",
      icon: "pi pi-bell",
      command: () => {
        removeFromMovieList();
      }
    }
  ]
  const maskStyle = {'background-color':'red', 'z-index':'1000'}
  //Renders a clickable movie, the onclick will navigate to inspectMovie where the clicked movie will be displayed
  return (
    <div className="movieCard" key={props.key}>
      {/*Stylas i SearchList.css*/}
      <NavLink onClick={selectMovie} to="/inspectMovie">
        <div className="titleWrapper"><h3>{props.movie.title}</h3></div>
        <div>{props.movie.body}</div>
        <div className="imgWrapper"><img src={props.movie.posterURLs[500]}></img></div>
      </NavLink>
      <SpeedDial model={items} direction="right" /> 
      {/* style={{'position':'absolute', 'bottom':'0px', 'left': '0px', 'background-color':'pink'}} buttonStyle={{'height': '10px', 'width':'25px', 'position':'absolute', 'bottom':'0px', 'left': '0px'}} maskStyle={maskStyle} */}
      {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
    </div>
  );
};

export default MovieView;

