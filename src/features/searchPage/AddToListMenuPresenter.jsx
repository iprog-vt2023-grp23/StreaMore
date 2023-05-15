import React, { useState } from "react";
import AddToListMenuView from "./AddToListMenuView";

const AddToListMenuPresenter = (props) => {
  const [newListName, setNewListName] = useState("");
  const [showCreateNewList, setShowCreateNewList] = useState(false);

  const onAddMovieToList = (listName) => {
    props.onAddMovieToList(listName, props.movie);
    props.setVisible(false);
  };

  const addNewMovieList = (e) => {
    e.preventDefault();
    if (newListName !== "") {
      props.onAddNewMovieList(newListName);
    }
    setShowCreateNewList(false);
    setNewListName("");
  };

  const cancelNewMovieList = (e) => {
    e.preventDefault();
    setShowCreateNewList(false);
    setNewListName("");
  };

  const editListName = (e) => {
    if (e.target.value.length > 20) return;
    setNewListName(e.target.value);
  };

  return (
    <AddToListMenuView
      movieLists={props.movieLists}
      onAddMovieToList={onAddMovieToList}
      setVisible={props.setVisible}
      addNewMovieList={addNewMovieList}
      cancelNewMovieList={cancelNewMovieList}
      editListName={editListName}
      newListName={newListName}
      showCreateNewList={showCreateNewList}
      setShowCreateNewList={setShowCreateNewList}
    />
  );
};

export default AddToListMenuPresenter;
