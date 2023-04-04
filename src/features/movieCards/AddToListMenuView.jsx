import "./AddToListMenuView.css";
import { useState } from "react";

import {ImCross, ImCheckmark} from "react-icons/im";

const AddToListMenuView = (props) => {
    const [newListName, setNewListName] = useState("");
    const [showCreateNewList, setShowCreateNewList] = useState(false);

    const onAddMovieToList = (listName) => {
         props.onAddMovieToList(listName, props.movie);
         props.setVisible(false);
    }


    const CreateNewList = () => {
      return (<li className="createNewList">
        
        
        <form>
          {/* <label htmlFor="newListName">Name of new list:</label> */}
          <input autoFocus type="text" id="newListName" value={newListName} onChange={(e) => setNewListName(e.target.value)}/>
          <ImCheckmark className="checkmark" onClick={(e) => {
            e.preventDefault();
            props.onAddNewMovieList(newListName);
            setShowCreateNewList(false);
            setNewListName("");
          }}/>
          <ImCross className="cross" onClick={(e) => {
            e.preventDefault();
            setShowCreateNewList(false);
            setNewListName("");
          }}/>
        </form>
        
        
        </li>);
    };


    console.log(props)
    return (
    <div className="addToListMenuBackground">
      {/* {showCreateNewList ? <CreateNewList/> : null} */}
      <div className="addToListMenu">
        <span className="addToListHeader">Add to list:</span>
        <ul className="listList">
        <li className="setCreateListButton" onClick={() => setShowCreateNewList(prevstate => !prevstate)}>Create list</li>

        {props.movieLists.map((list) => (
            <li onClick={() => onAddMovieToList(list.name)} key={list.name}>{list.name}</li>
        ))}
        {showCreateNewList ? <CreateNewList/> : null}
        </ul>
        <button className="close" onClick={() => props.setVisible(false)}>Close</button>
      </div>
    </div>
    )
  }

export default AddToListMenuView;