import "../searchPage/SearchList.css";

const MovieListView = (props) => {
  return (
    <section className="searchList">
      <h2>My Movie List</h2>
      <div className="searchResults">{props.content}</div>
    </section>
  )
};

export default MovieListView;