import { useSelector, useDispatch } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists, selectMovieList, getSelectedList, removeMovieFromMovieList, removeMovieList, addNewMovieList, addMovieToMovieList} from "./myListsSlice";
import { getSelectedMovie, selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import BacknHomeButton from "../uiComponents/BacknHomeButton";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import FirebaseApp from "../../FirebaseConfig";
import AddToListMenuPresenter from "../searchPage/AddToListMenuPresenter";

const MyListsPagePresenter = () => {
  const movieLists = useSelector(getMovieLists);
  const selectedList = useSelector(getSelectedList);
  const dispatch = useDispatch();
  const [updateName, setUpdateName] = useState(false);
  const [newListName, setNewListName] = useState(selectedList);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);
  const selectedMovie = useSelector(getSelectedMovie);
  const toast = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(FirebaseApp);
    const user = auth.currentUser;

    if (!user) {
      navigate('/signIn');
    }
  }, [navigate]);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };

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

  const onAddMovieToList = (listName, movie) => {
    const detailString = 'Added "' + movie.originalTitle + '" to list "' + listName + '".';
    toast.current.show({ severity: 'success', summary: 'Info Message', detail: detailString, life: 3000 });
    dispatch(addMovieToMovieList({ listName, movie }));
  };


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
        label: "Plus",
        icon: "pi pi-plus",
        command: () => {
          console.log("Add movie to listen")
          console.log(movie)
          setShowAddToListMenu(prevState => !prevState);
          selectMovie(movie);
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
    <Toast ref={toast} position="top-left"/>
  {showAddToListMenu ? <AddToListMenuPresenter setVisible={setShowAddToListMenu} 
      onAddNewMovieList={addMovieList} 
      movieLists={movieLists} 
      onAddMovieToList={onAddMovieToList}
      movie={selectedMovie}/> : null}
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
