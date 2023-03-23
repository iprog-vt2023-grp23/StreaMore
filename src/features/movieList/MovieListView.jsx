import "../searchPage/SearchList.css";

const MovieListView = (props) => {
  console.log("view",props.content)
  return (
    <section className="searchList">
      <h2>My Movie List</h2>
      <div className="searchResults">{props.content}</div>
    </section>
  )
};

export default MovieListView;