import { useSelector, useDispatch } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists, selectMovieList, getSelectedList, removeMovieFromMovieList, removeMovieList, addNewMovieList, addMovieToMovieList} from "./myListsSlice";
import { useEffect, useState } from "react";
import BacknHomeButton from "../uiComponents/BacknHomeButton";

const MyListsPagePresenter = () => {
  const movieLists = useSelector(getMovieLists);
  const selectedList = useSelector(getSelectedList);
  const dispatch = useDispatch();
  const [updateName, setUpdateName] = useState(false);
  const [newListName, setNewListName] = useState(selectedList);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);



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



    const setSelectedList = (list) => {
    setNewListName("");
    setUpdateName(false);
    selectList(list);
  }

  const confirmedUpdateName = (e) => {
    e.preventDefault();
    updateListName(newListName);
    setUpdateName(false);
    setNewListName("");
  }

  const cancelUpdateListName = (e) => {
    e.preventDefault();
    setUpdateName(false);
    setNewListName("");
  }

  const editListName = (e) => {
    if(e.target.value.length > 20) return;
    setNewListName(e.target.value)
  }

  const toggleEditListName = () => {
    setNewListName(selectedList);
    setUpdateName(prevState => !prevState);
  }

  const handleDelete = () => {
    removeList(selectedList);
    setShowConfirmDelete(false);
  }

  return <>
    <BacknHomeButton />
    <MyListsPageView
      movieLists={movieLists}
      createNewList={createNewList}
      selectedList={selectedList}
      onSelectList={selectList}
      getItems={getItems}
      updateListName={confirmedUpdateName}
      addNewMovieList={addMovieList} 
      updateName={updateName}
      setUpdateName={setUpdateName}
      newListName={newListName}
      setNewListName={setNewListName}
      showConfirmDelete={showConfirmDelete}
      setShowConfirmDelete={setShowConfirmDelete} 
      setSelectedList={setSelectedList}
      handleDelete={handleDelete}
      cancelUpdateListName={cancelUpdateListName}
      editListName={editListName}
      toggleEditListName={toggleEditListName}
      />
  </>

};

export default MyListsPagePresenter;
