import "./MyListsPage.css"


const MovieListView = (props) => {
  return (
    <section className="MyListsPageView">
      <h2>My Lists</h2>
        <div className="listMenu">
        </div>
        {props.content}
    </section>
  )
};

export default MovieListView;