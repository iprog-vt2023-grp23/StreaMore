import "./SearchList.css";

const SearchListView = (props) => {
  // const [showAddToListMenu, setShowAddToListMenu] = useState(false);


  // const items = [
  //   {
  //     label: "Add",
  //     icon: "pi pi-plus",
  //     command: () => {
  //       setShowAddToListMenu(prevState => !prevState);
  //     }
  //   },
  //   {
  //     label: "Notify",
  //     icon: "pi pi-bell",
  //     command: () => {
  //       console.log("Notify user plis");
  //     }
  //   }
  // ]

  return (
    <section className="searchList">
      <h2>Search for "{props.keyword}"</h2>
      {props.content}
    </section>
  );
};

export default SearchListView;
