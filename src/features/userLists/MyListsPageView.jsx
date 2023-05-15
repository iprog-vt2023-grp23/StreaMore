import "./MyListsPage.css"
import MovieCardList from "../movieCards/MovieCardListPresenter";
import {RiDeleteBin6Line, RiEdit2Line} from "react-icons/ri"
import {ImCross, ImCheckmark} from "react-icons/im";
import ConfirmDelete from "./ConfirmDeleteView";
import {AiOutlinePlus} from "react-icons/ai";

const MovieListView = (props) => {

  const newNameForm = () => {
    return (
      <form onSubmit={(e) => props.updateListName(e)} className="updateListNameForm">
              <input autoFocus type="text" id="newListName" className="newListName" value={props.newListName} onChange={props.editListName}/>
              <div>
              <ImCheckmark className="checkmark" onClick={(e) => props.updateListName(e)}/>
              <ImCross className="cross" onClick={props.cancelUpdateListName}/>
              </div>
            </form>
    )
  }

  const editListButtons = () => {
    return (
      <div className="editIcons">
      <RiDeleteBin6Line className="deleteListIcon" onClick={() => props.setShowConfirmDelete(prev => !prev)}/>
      <RiEdit2Line className="editListIcon" onClick={props.toggleEditListName}/>
      </div>
    )
  }
  

  const listMenu = () => {
    return (
    <div className="listMenu">
        {props.movieLists.map((list) => (
          <div key={list.name} className={props.selectedList === list.name ? "selectedListItem" : "listItem"} onClick={() => props.setSelectedList(list)}>
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
    {props.showConfirmDelete && <ConfirmDelete listname={props.selectedList} handleDelete={props.handleDelete} setConfirmDelete={props.setShowConfirmDelete}/>}
      {props.updateName ? <h2>{newNameForm()}</h2> : <h2 className="listTitle" onClick={props.toggleEditListName}>{props.selectedList}</h2>}
      {props.selectedList && editListButtons()}
      {listMenu()}
        <div className="listContent">
          {props.selectedList !== null ? (
            <MovieCardList movies={props.movieLists.find(list => list.name === props.selectedList).movies} getItems={props.getItems}
            />
          ) : (
            <button className="createFirstList" onClick={() => {props.addNewMovieList("My list")}}>No lists yet, create one</button>
          )}
        </div>
    </section>
    </>
  )
};

export default MovieListView;