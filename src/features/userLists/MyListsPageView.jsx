import "./MyListsPage.css"
import MovieCardList from "../movieCards/MovieCardListPresenter";
import {BsThreeDotsVertical} from "react-icons/bs"
import {RiDeleteBin6Line, RiEdit2Line} from "react-icons/ri"
import { useState } from "react";

const MovieListView = (props) => {
  //const [selectedList, setSelectedList] = useState("");
  const [updateName, setUpdateName] = useState(false);
  const [newName, setNewName] = useState(props.selectedList);

  const setSelectedList = (list) => {
    props.onSelectList(list);
  }

  return (
    <section className="MyListsPageView">
      {updateName ? <h2>updating name</h2> : <h2>{props.selectedList}</h2>}
      {props.selectedList && <div className="editIcons">
      <RiDeleteBin6Line className="deleteListIcon" onClick={() => props.removeMovieList(props.selectedList)}/>
      <RiEdit2Line className="editListIcon" onClick={() => setUpdateName(prevState => !prevState)}/>
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