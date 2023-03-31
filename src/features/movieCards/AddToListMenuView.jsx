const AddToListMenu = (props) => {
    const style = {
      bottom: props.y,
      left: props.x,
    };

    return (
      <div className="addToListMenu" style={style}>
        <span>Add to list:</span>
        <button onClick={() => props.setVisible(false)}>Close</button></div>
    )
  }

export default AddToListMenu;