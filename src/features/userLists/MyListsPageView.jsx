import "./MyListsPage.css"
import MovieCardList from "../movieCards/MovieCardListPresenter";
import {BsThreeDotsVertical} from "react-icons/bs"
import {RiDeleteBin6Line, RiEdit2Line} from "react-icons/ri"
import { useState } from "react";
import {ImCross, ImCheckmark} from "react-icons/im";
import ConfirmDelete from "./ConfirmDelete";
import {AiOutlinePlus} from "react-icons/ai";


const MovieListView = (props) => {
  const [updateName, setUpdateName] = useState(false);
  const [newListName, setNewListName] = useState(props.selectedList);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const setSelectedList = (list) => {
    setNewListName("");
    setUpdateName(false);
    props.onSelectList(list);
  }

  const updateListName = (e) => {
    e.preventDefault();
    props.updateListName(newListName);
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
    setNewListName(props.selectedList);
    setUpdateName(prevState => !prevState);
  }

  const handleDelete = () => {
    props.removeMovieList(props.selectedList);
    setShowConfirmDelete(false);
  }

  const newNameForm = () => {
    return (
      <form onSubmit={(e) => updateListName(e)} className="updateListNameForm">
              <input autoFocus type="text" id="newListName" className="newListName" value={newListName} onChange={editListName}/>
              <div>
              <ImCheckmark className="checkmark" onClick={(e) => updateListName(e)}/>
              <ImCross className="cross" onClick={cancelUpdateListName}/>
              </div>
            </form>
    )
  }

  const editListButtons = () => {
    return (
      <div className="editIcons">
      <RiDeleteBin6Line className="deleteListIcon" onClick={() => setShowConfirmDelete(prev => !prev)}/>
      <RiEdit2Line className="editListIcon" onClick={toggleEditListName}/>
      </div>
    )
  }
  

  const listMenu = () => {
    return (
    <div className="listMenu">
        {props.movieLists.map((list) => (
          <div key={list.name} className={props.selectedList === list.name ? "selectedListItem" : "listItem"} onClick={() => setSelectedList(list)}>
            {list.name}
          </div>
        ))}
        {props.movieLists.length > 0 && <li className="listItem" onClick={() => props.createNewList()}><AiOutlinePlus/></li>}
    </div> 
    )
  }



  return (
    <>
    <section className="MyListsPageView">
    {showConfirmDelete && <ConfirmDelete listname={props.selectedList} handleDelete={handleDelete} setConfirmDelete={setShowConfirmDelete}/>}
      {updateName ? <h2>{newNameForm()}</h2> : <h2 className="listTitle" onClick={toggleEditListName}>{props.selectedList}</h2>}
      {props.selectedList && editListButtons()}
      {listMenu()}
        <div className="listContent">
          {props.selectedList !== null ? (
            <MovieCardList movies={props.movieLists.find(list => list.name === props.selectedList).movies} getItems={props.getItems}
            />
          ) : (
            // <p>{"No movie lists added, find a movie you'd like to add first :)"}</p>
            <button className="createFirstList" onClick={() => {props.addNewMovieList("My list")}}>No lists yet, create one</button>
          )}
        </div>
    </section>
    </>
  )
};

export default MovieListView;