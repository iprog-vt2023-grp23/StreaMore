import "./MovieList.css"


const MovieListView = (props) => {
  return (
    <section className="MovieListView">
      <h2>My Lists</h2>
      {props.content}
    </section>
  )
};

export default MovieListView;