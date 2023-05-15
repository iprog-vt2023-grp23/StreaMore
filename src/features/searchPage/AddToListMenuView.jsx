import "./AddToListMenu.css";
import { useState } from "react";

import { ImCross, ImCheckmark } from "react-icons/im";

const AddToListMenuView = (props) => {
  const createNewList = () => {
    return (
      <li className="createNewList">
        <form onSubmit={props.addNewMovieList}>
          <input
            autoFocus
            type="text"
            id="newListName"
            value={props.newListName}
            onChange={props.editListName}
          />
          <ImCheckmark className="checkmark" onClick={props.addNewMovieList} />
          <ImCross className="cross" onClick={props.cancelNewMovieList} />
        </form>
      </li>
    );
  };

  return (
    <div className="addToListMenuBackground">
      <div className="addToListMenu">
        <span className="addToListHeader">Add to list:</span>
        <ul className="listList">
          <li
            className="setCreateListButton"
            onClick={() =>
              props.setShowCreateNewList((prevstate) => !prevstate)
            }
          >
            Create list
          </li>

          {props.movieLists.map((list) => (
            <li
              onClick={() => props.onAddMovieToList(list.name)}
              key={list.name}
            >
              {list.name}
            </li>
          ))}
          {props.showCreateNewList ? createNewList() : null}
        </ul>
        <button className="close" onClick={() => props.setVisible(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddToListMenuView;
