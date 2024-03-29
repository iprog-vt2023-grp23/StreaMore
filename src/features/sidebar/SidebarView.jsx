import { FiAlignJustify } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { forwardRef } from "react";

const SidebarView = forwardRef((props, ref) => {
  const sidebarButton = () => {
    props.onSidebarButtonClick();
  };
  const signOut = () => {
    props.onSignOut();
  };

  const signInButton = () => {
    if (props.loggedIn) {
      return (
        <NavLink className="nav-link" to="/" onClick={signOut}>
          Sign Out
        </NavLink>
      );
    } else {
      return (
        <NavLink className="nav-link" to="/signIn">
          Sign In
        </NavLink>
      );
    }
  };
  const navigationButtons = () => {
    if (props.loggedIn) {
      return [
        <NavLink className="nav-link" to="/myLists" key="0">
          My Lists
        </NavLink>,
        <NavLink className="nav-link" to="/userPage" key="1">
          User
        </NavLink>,
      ];
    } else return;
  };

  return (
    <div className="sidebarLinks" ref={ref}>
      <FiAlignJustify
        className="sidebarButtonRotated"
        onClick={sidebarButton}
      ></FiAlignJustify>
      <NavLink className="nav-link" to="/">
        Search
      </NavLink>
      {navigationButtons()}
      {signInButton()}
    </div>
  );
});

export default SidebarView;
