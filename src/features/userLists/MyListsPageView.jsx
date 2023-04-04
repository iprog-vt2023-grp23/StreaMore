import "./MyListsPage.css"
import { useState } from "react";
import MovieCardList from "../movieCards/MovieCardList";


const MovieListView = (props) => {
  const [selectedList, setSelectedList] = useState("");


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
      <h2>My Lists</h2>
        <div className="listMenu">
          <ul>
            {props.movieLists.map((list) => (
              <li key={list.name} onClick={() => setSelectedList(list)}>{list.name}</li>
            ))}
          </ul>
        </div>
        <div className="listContent">
          <h3>{selectedList.name}</h3>

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