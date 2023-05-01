import "./AddToListMenu.css";
import { useState } from "react";

import {ImCross, ImCheckmark} from "react-icons/im";

const AddToListMenuView = (props) => {
    //UI component state, does not need to be in presenter
    const [newListName, setNewListName] = useState("");
    const [showCreateNewList, setShowCreateNewList] = useState(false);

    const onAddMovieToList = (listName) => {
         props.onAddMovieToList(listName, props.movie);
         props.setVisible(false);
    }

    const addNewMovieList = (e) => {
      e.preventDefault();
      props.onAddNewMovieList(newListName);
      setShowCreateNewList(false);
      setNewListName("");
    }

    const cancelNewMovieList = (e) => {
      e.preventDefault();
      setShowCreateNewList(false);
      setNewListName("");
    }

    const editListName = (e) => {
      if(e.target.value.length > 20) return;
      setNewListName(e.target.value)
    }

    const createNewList = () => {
      return (
      <li className="createNewList">   
        <form onSubmit={addNewMovieList}>
          <input autoFocus type="text" id="newListName" value={newListName} onChange={editListName}/>
          <ImCheckmark className="checkmark" onClick={addNewMovieList}/>
          <ImCross className="cross" onClick={cancelNewMovieList}/>
        </form>
      </li>
      );
    };

    return (
    <div className="addToListMenuBackground">
      <div className="addToListMenu">
        <span className="addToListHeader">Add to list:</span>
        <ul className="listList">
        <li className="setCreateListButton" onClick={() => setShowCreateNewList(prevstate => !prevstate)}>Create list</li>

        {props.movieLists.map((list) => (
            <li onClick={() => onAddMovieToList(list.name)} key={list.name}>{list.name}</li>
        ))}
        {showCreateNewList ? createNewList() : null}
        </ul>
        <button className="close" onClick={() => props.setVisible(false)}>Close</button>
      </div>
    </div>
    )
  }

export default AddToListMenuView;