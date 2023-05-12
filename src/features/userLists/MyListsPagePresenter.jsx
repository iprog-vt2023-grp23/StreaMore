import { useSelector, useDispatch } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists, selectMovieList, getSelectedList, removeMovieFromMovieList, removeMovieList, addNewMovieList, addMovieToMovieList} from "./myListsSlice";
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
    dispatch(removeMovieFromMovieList({name: selectedList, movie: movie}))
  }

  const removeList = (list) => {
   dispatch(removeMovieList(list))
  }

  const findUniqueListName = (listName) => {
    let i = 1;
    let newListName = listName;
    while(movieLists.find(list => list.name === newListName)){
      newListName = listName + " (" + i + ")";
      i++;
    }
    return newListName;
  }

  const updateListName = (newListName) => {
    if(newListName === "" || newListName === selectedList){
      return;
    }
    const listName = findUniqueListName(newListName);
    const oldList = movieLists.find(list => list.name === selectedList).movies;
    dispatch(addNewMovieList(listName));
    oldList.forEach(movie => { 
      dispatch(addMovieToMovieList({listName: listName, movie: movie}))
    })
    dispatch(removeMovieList(selectedList))
    dispatch(selectMovieList(listName))
  }

  const addMovieList = (listName) => {
    if(listName === ""){
      return;
    }
    dispatch(addNewMovieList(listName));
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

  const createNewList = () => {
    const newListName = findUniqueListName("New List");
    dispatch(addNewMovieList(newListName));
    dispatch(selectMovieList(newListName));
  }

  return <>
  <BacknHomeButton/>
  <MyListsPageView movieLists={movieLists} createNewList={createNewList} selectedList={selectedList} onSelectList={selectList} getItems={getItems} removeMovieList={removeList} updateListName={updateListName} addNewMovieList={addMovieList}/>
  </>

};

export default MyListsPagePresenter;
