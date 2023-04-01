const AddToListMenu = (props) => {

    return (
    <div className="addToListMenuBackground">
      <div className="addToListMenu">
        <span>Add to list:</span>
        <ul>
        {props.movieLists.map((list) => (
            <li onClick={() => props.onAddMovieToList(list.name)} key={list.name}>{list.name}</li>
        ))}
        <li>..new list</li>
        </ul>
        <button onClick={() => props.setVisible(false)}>Close</button>
      </div>
    </div>
    )
  }

export default AddToListMenu;