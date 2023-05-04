import "./MyListsPage.css"
import MovieCardList from "../movieCards/MovieCardListPresenter";
import {BsThreeDotsVertical} from "react-icons/bs"
import {RiDeleteBin6Line, RiEdit2Line} from "react-icons/ri"
import { useState } from "react";
import {ImCross, ImCheckmark} from "react-icons/im";


const MovieListView = (props) => {
  //const [selectedList, setSelectedList] = useState("");
  const [updateName, setUpdateName] = useState(false);
  const [newListName, setNewListName] = useState(props.selectedList);

  const setSelectedList = (list) => {
    props.onSelectList(list);
  }

  const updateListname = (e) => {
    e.preventDefault();
    // props.onupdateListname(newListName);
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


  return (
    <section className="MyListsPageView">
      {updateName ? 
              <h2><form onSubmit={updateListname} className="updateListNameForm">
              <input autoFocus type="text" id="newListName" className="newListName" value={newListName} onChange={editListName}/>
              <div>
              <ImCheckmark className="checkmark" onClick={updateListname}/>
              <ImCross className="cross" onClick={cancelUpdateListName}/>
              </div>
            </form></h2>
      : <h2>{props.selectedList}</h2>}
      {props.selectedList && <div className="editIcons">
      <RiDeleteBin6Line className="deleteListIcon" onClick={() => props.removeMovieList(props.selectedList)}/>
      <RiEdit2Line className="editListIcon" onClick={toggleEditListName}/>
      </div>}
        <div className="listMenu">
          <ul>
            {props.movieLists.map((list) => (
              <li key={list.name} className={props.selectedList === list.name ? "selectedListItem" : "listItem"} onClick={() => setSelectedList(list)}>
                {list.name}
                {/* <BsThreeDotsVertical className="listMenuIcon" /> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="listContent">
          {props.selectedList !== null ? (
            <MovieCardList movies={props.movieLists.find(list => list.name === props.selectedList).movies} getItems={props.getItems}
            />
          ) : (
            <p>{"No movie lists added, find a movie you'd like to add first :)"}</p>
          )}
        </div>
    </section>
  )
};

export default MovieListView;