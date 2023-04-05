import "./MyListsPage.css"
import { useState } from "react";
import MovieCardList from "../movieCards/MovieCardList";
import {BsThreeDotsVertical} from "react-icons/bs"

const MovieListView = (props) => {
  console.log("props.movieLists:",props.movieLists)
  const [selectedList, setSelectedList] = useState("");
  if(props.movieLists) {
    if(props.movieLists.length > 0) {
      if(selectedList === "") {
        setSelectedList(props.movieLists[0])
      }
    }
  }


  const renderSelectedList = () => {
    if (selectedList !== "" && Array.isArray(selectedList.movies)) {
      console.log("selectedList:",selectedList)
      if(selectedList.movies.length === 0) {return <p>No movies in this list</p>}
      console.log("selectedList.movies:",selectedList.movies)
      return <MovieCardList movies={selectedList.movies} />
    } else {
      console.log("No movies in asdasdthis list")
    }
  }

  return (
    <section className="MyListsPageView">
      <h2>{selectedList.name}</h2>
        <div className="listMenu">
          <ul>
            {props.movieLists.map((list) => (
              <li key={list.name} className={selectedList.name === list.name ? "selectedListItem" : "listItem"} onClick={() => setSelectedList(list)}>
                {list.name}
                {/* <BsThreeDotsVertical className="listMenuIcon" /> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="listContent">
          {selectedList !== "" && Array.isArray(selectedList.movies) ? (
            <MovieCardList movies={selectedList.movies} />
          ) : (
            <p>No movies in this list</p>
          )}
        </div>
    </section>
  )
};

export default MovieListView;