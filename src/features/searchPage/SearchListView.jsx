import "./SearchList.css";

const SearchListView = (props) => {

  return (
    <section className="searchList">
      <h2>Search for "{props.keyword}"</h2>
      <div className="searchResults">{props.content}</div>
    </section>
  );
};

export default SearchListView;
