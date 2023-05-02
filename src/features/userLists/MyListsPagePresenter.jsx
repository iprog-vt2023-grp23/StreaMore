import { useSelector, useDispatch } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists, selectMovieList, getSelectedList, removeMovieFromMovieList, removeMovieList } from "./myListsSlice";
import { useEffect, useState } from "react";
import BacknHomeButton from "../uiComponents/BacknHomeButton";

const MyListsPagePresenter = () => {
  const movieLists = useSelector(getMovieLists);
  const selectedList = useSelector(getSelectedList);
  const dispatch = useDispatch();
  const selectList = (list) => {
    dispatch(selectMovieList(list.name))
  }

  const removeMovieFromList = (movie) => {
    console.log("selectedList is ", selectedList)
    dispatch(removeMovieFromMovieList({name: selectedList, movie: movie}))
  }

  const removeList = (list) => {
   dispatch(removeMovieList(list))
  }



  const getItems = (movie) => {
    return [
      {
        label: "Minus",
        icon: "pi pi-minus",
        command: () => {
          removeMovieFromList(movie);
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
  }

  useEffect(() => {
    if(movieLists.length > 0 && !selectedList){
      dispatch(selectMovieList(movieLists[0].name))
    }
  }, [movieLists])

  return <>
  <BacknHomeButton/>
  <MyListsPageView movieLists={movieLists} selectedList={selectedList} onSelectList={selectList} getItems={getItems} removeMovieList={removeList}/>
  </>

};

export default MyListsPagePresenter;
