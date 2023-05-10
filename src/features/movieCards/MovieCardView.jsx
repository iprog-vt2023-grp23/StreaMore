import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { SpeedDial } from 'primereact/speeddial';
import { Button } from 'primereact/button';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import "./MovieCard.css";

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
const MovieCardView = (props) => {
  //Selects a clicked movie for inspection
  const selectMovie = () => {
    props.onSelectMovie(props.movie);
  };

  const toast = useRef(null);
  const movieCard = () => {
    return (
      <>
      <NavLink onClick={selectMovie} to="/inspectMovie">
      <div className="titleWrapper"><h3>{props.movie.title}</h3></div>
      <div>{props.movie.body}</div>
      <div className="imgWrapper"><img src={props.movie.posterURLs[500]}></img></div>
    </NavLink> 
      <div className="movieActionContainer">
      {/* <SpeedDial model={props.getItems(props.movie)} direction="right" buttonStyle={{'background':'grey', 'border': 'none', 'opacity':'80%', 'width': '25px', 'height': '10px'}}/>  */}
      <Button className="addButton" icon="pi pi-plus" onClick={() => props.onPlusButtonClick(props.movie)}/>
      </div>
      {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
      </>
    ) 
    }

  //Renders a clickable movie, the onclick will navigate to inspectMovie where the clicked movie will be displayed
  return (
    <>
    <Toast ref={toast}/>
    <div className="movieCard">
      {movieCard()}
    </div>
    </>
  );
};

export default MovieCardView;

