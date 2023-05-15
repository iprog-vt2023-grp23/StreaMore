import "./MyListsPage.css";

const ConfirmDelete = ({ listname, handleDelete, setConfirmDelete }) => {
  return (
    <div className="confirmDelete">
      <p>Are you sure you want to delete {listname}?</p>
      <div className="yesno">
        <button onClick={() => handleDelete()}>Yes</button>
        <button onClick={() => setConfirmDelete(false)}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
