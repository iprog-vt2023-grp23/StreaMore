import "./SearchList.css";

const SearchListView = (props) => {

  return (
    <section className="searchList">
      <h2>Search for "{props.keyword}"</h2>
      {props.content}
    </section>
  );
};

export default SearchListView;
