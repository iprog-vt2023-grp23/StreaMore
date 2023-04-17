import "./MyListsPage.css"
import MovieCardList from "../movieCards/MovieCardListPresenter";
import {BsThreeDotsVertical} from "react-icons/bs"

const MovieListView = (props) => {
  //const [selectedList, setSelectedList] = useState("");

  const setSelectedList = (list) => {
    props.onSelectList(list);
  }

  return (
    <section className="MyListsPageView">
      <h2>{props.selectedList}</h2>
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
            <MovieCardList movies={props.movieLists.find(list => list.name === props.selectedList).movies} />
          ) : (
            <p>No movies in this list</p>
          )}
        </div>
    </section>
  )
};

export default MovieListView;