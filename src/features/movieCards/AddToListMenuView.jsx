const AddToListMenu = (props) => {

    return (
    <div className="addToListMenuBackground">
      <div className="addToListMenu">
        <span>Add to list:</span>
        <button onClick={() => props.setVisible(false)}>Close</button>
      </div>
    </div>
    )
  }

export default AddToListMenu;