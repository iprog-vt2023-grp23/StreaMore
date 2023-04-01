import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { SpeedDial } from 'primereact/speeddial';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import "./MovieView.css";

PrimeReact.appendTo = 'self';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import AddToListMenu from "./AddToListMenuView";

/*
 *A reusable function used for rendering a movie, is used in the movie list as well as the searchList and InspectMovie
 */
const MovieView = (props) => {
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);

  //Selects a clicked movie for inspection
  const selectMovie = () => {
    props.onSelectMovie(props.movie);
    //dispatch(selectMovieToInspect(result));
  };

  // /*
  //  *Adds and removes a rendered movie to and from the user movie list
  //  */
  // const addToMovieList = () => {
  //   props.onAddToMovieList(props.movie);
  //   //dispatch(addMovieToList(result));
  // };
  // const removeFromMovieList = () => {
  //   props.onRemoveToMovieList(props.movie);
  //   //dispatch(removeMovieFromList(result));
  // };

  const toast = useRef(null);

  const items = [

    {
      label: "Add",
      icon: "pi pi-plus",
      // visible: !props.movieList.includes(props.movie),
      command: () => {
        setShowAddToListMenu(prevState => !prevState);
      }
    },
    {
      label: "Remove",
      icon: "pi pi-minus",
      // visible: props.movieList.includes(props.movie),
      command: () => {
        removeFromMovieList();
        toast.current.show({severity:'success', summary: 'Removed from list', detail:'Movie removed from your list', life: 3000});
      }
    },
    {
      label: "Notify",
      icon: "pi pi-bell",
      command: () => {
        console.log("Notify user plis");
      }
    }
  ]

  const movieCard = () => {
    return (
      <>
      <NavLink onClick={selectMovie} to="/inspectMovie">
      <div className="titleWrapper"><h3>{props.movie.title}</h3></div>
      <div>{props.movie.body}</div>
      <div className="imgWrapper"><img src={props.movie.posterURLs[500]}></img></div>
    </NavLink> 
      <SpeedDial model={items} direction="right" buttonStyle={{'background':'none', 'border': 'none', 'opacity':'80%', 'width': '25px', 'height': '10px'}}/> 
      {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
      </>
    ) 
    }

  //Renders a clickable movie, the onclick will navigate to inspectMovie where the clicked movie will be displayed
  return (
    <>
    {showAddToListMenu ? <AddToListMenu setVisible={setShowAddToListMenu} movieLists={props.movieLists}/> : null}
    <Toast ref={toast}/>
    <div className="movieCard">
      {movieCard()}
    </div>
    </>
  );
};

export default MovieView;

