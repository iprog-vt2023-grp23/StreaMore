import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSidebarState, toggleSidebar } from "./sidebarSlice";
import { NavLink } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import SidebarView from "./SidebarView";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector(getSidebarState);

  //Inverts the sidebar state to toggle it
  const sidebarButtonClick = () => {
    dispatch(toggleSidebar());
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
        <SidebarView onSidebarButtonClick={sidebarButtonClick} />
      )}
    </div>
  );
};

export default Sidebar;
