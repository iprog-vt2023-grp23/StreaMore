import { FiAlignJustify } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const SidebarView = (props) => {
  const sidebarButton = () => {
    props.onSidebarButtonClick();
  }
  return (
    <div className="sidebarLinks">
      <FiAlignJustify
        className="sidebarButtonRotated"
        onClick={sidebarButton}
      ></FiAlignJustify>
      <NavLink className="nav-link" to="/">
        Search
      </NavLink>
      <NavLink className="nav-link" to="/movieList">
        List
      </NavLink>
      <NavLink className="nav-link" to="/userPage">
        User
      </NavLink>
      <NavLink className="nav-link" to="/">
        Search
      </NavLink>
    </div>
  );
};

export default SidebarView;
