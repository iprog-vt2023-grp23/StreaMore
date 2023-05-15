import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarState, toggleSidebar } from "./sidebarSlice";
import { FiAlignJustify } from "react-icons/fi";
import SidebarView from "./SidebarView";
import FirebaseApp from "../../FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useRef } from "react";

import "./Sidebar.css";

const Sidebar = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const sidebarState = useSelector(getSidebarState);
  const auth = getAuth(FirebaseApp);
  const loggedIn = auth.currentUser;

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = ref;
    if (wrap && !wrap.contains(event.target)) {
      dispatch(toggleSidebar());
    }
  };

  //Inverts the sidebar state to toggle it
  const sidebarButtonClick = () => {
    dispatch(toggleSidebar());
  };
  const signOutButton = async () => {
    await signOut(auth).then(() => {
      location.reload();
    });
  };

  //Returns a button if the sidebar is not toggled
  const sidebarButton = () => {
    if (!sidebarState) {
      return (
        <FiAlignJustify
          className="sidebarButton"
          onClick={sidebarButtonClick}
        ></FiAlignJustify>
      );
    }
    return false;
  };

  /*
   *Renders a button if the sidebar is not toggled or navigation links if it is
   *NavLink uses BrowserRouter to navigate to different pages the "to=" matches with a route in App.jsx
   */
  return (
    <div className="sidebar">
      {sidebarButton() || (
        <SidebarView
          onSidebarButtonClick={sidebarButtonClick}
          onSignOut={signOutButton}
          loggedIn={loggedIn}
          ref={ref}
        />
      )}
    </div>
  );
};

export default Sidebar;
