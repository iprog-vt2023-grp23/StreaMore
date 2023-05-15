import { useSelector, useDispatch } from "react-redux";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useState, useRef } from "react";

// import {
//   getMovieList,
// } from "../userLists/myListsSlice";
import {
  selectAllResults,
  getResultsStatus,
  getResultsError,
  getKeyword
} from "./searchSlice";
import "./SearchList.css";
import { getSelectedMovie } from "../inspectMovie/inspectMovieSlice";
import { BiLoaderCircle } from "react-icons/bi";
import MovieCardList from "../movieCards/MovieCardListPresenter";
import SearchListView from "./SearchListView";
import { addMovieToMovieList, addNewMovieList, getMovieLists } from "../userLists/myListsSlice";
import {getAuth} from "firebase/auth"
import { Toast } from 'primereact/toast';
import FirebaseApp from "../../FirebaseConfig";
import AddToListMenuPresenter from "./AddToListMenuPresenter";



const SearchList = () => {
  const dispatch = useDispatch();
  let results = useSelector(selectAllResults);
  console.log("results is ", results)
  let status = useSelector(getResultsStatus);
  // const movieList = useSelector(getMovieList);
  const error = useSelector(getResultsError);
  const keyword = useSelector(getKeyword);
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);
  const selectedMovie = useSelector(getSelectedMovie);
  const movieList = useSelector(getMovieLists);
  const toast = useRef(null);
  
  const loggedIn = getAuth(FirebaseApp).currentUser;
  
  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };

  const onAddNewMovieList = (listName) => {
    if(listName === ""){ return; }
    dispatch(addNewMovieList( listName ));
  };
  const onAddMovieToList = (listName, movie) => {
    const detailString = 'Added "' + movie.originalTitle + '" to list "' + listName + '".';
    toast.current.show({ severity: 'success', summary: 'Info Message', detail: detailString, life: 3000 });
    dispatch(addMovieToMovieList({ listName, movie }));
  };

  const onPlusButtonClick = (movie) => {
    console.log("Add movie to listen")
    console.log("movie is ", movie)
    setShowAddToListMenu(prevState => !prevState);
    selectMovie(movie);
  }

  const getItems = (movie) => {
    return loggedIn ? [
      {
        label: "Add",
        icon: "pi pi-plus",
        command: () => {
          console.log("Add movie to listen")
          console.log("movie is ", movie)
          setShowAddToListMenu(prevState => !prevState);
          selectMovie(movie);
        }
      },
      {
        label: "Notify",
        icon: "pi pi-bell",
        command: () => {
          console.log("Notify user plis");
        }
      }
    ] : [];
  }

  // Either render a loading gif, the search result or an error depending on the status
  if (status === "loading") {
    return <BiLoaderCircle className="loadingCircle" />;
  
  }  else if (status === "succeeded") {
    //Spreads the results array and sorts it by imdb rating





    /*
    * Detta är en presenter, vet inte om vi borde använda den som ett ui element!
    */
    const content = <MovieCardList movies={results} getItems={getItems} onPlusButtonClick={onPlusButtonClick} search={true}/>;
    /*
     * 
     */
    return (
    <>
    <Toast ref={toast} position="top-left"/>
    {showAddToListMenu ? <AddToListMenuPresenter setVisible={setShowAddToListMenu} 
      onAddNewMovieList={onAddNewMovieList} 
      movieLists={movieList} 
      onAddMovieToList={onAddMovieToList}
      movie={selectedMovie}/> : null}
    <SearchListView content={content} keyword={keyword} />
    </>);
    //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object
  } else if (status === "failed") {
    return <div>{error}</div>;
  }
};

export default SearchList;
