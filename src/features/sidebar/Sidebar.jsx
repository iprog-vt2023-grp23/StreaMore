import '../../App.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarState, toggleSidebar } from './sidebarSlice';
import { NavLink } from 'react-router-dom';
import {FiAlignJustify} from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
    const dispatch = useDispatch();
    const[sidebarState, setSidebarState] = useState(useSelector(getSidebarState));
    // console.log(sidebarState)

    const sidebarButtonClick = () => {
        setSidebarState(!sidebarState);
        dispatch(toggleSidebar())
    }

    const sidebarButton = () => {
        if(!sidebarState){
            return(
                <FiAlignJustify className="sidebarButton" onClick={sidebarButtonClick}>
                </FiAlignJustify>
            )
        }
        return false;
    }

    return (
    <div className='sidebar'>   
    {sidebarButton() ||         
        (<>
        <div className='sidebarLinks'>
        <FiAlignJustify className="sidebarButtonRotated" onClick={sidebarButtonClick}>Close</FiAlignJustify>
            <NavLink className="nav-link" to="/">Search</NavLink>
            <NavLink className="nav-link" to="/movieList">List</NavLink>
            <NavLink className="nav-link" to="/userPage">User</NavLink>
            <NavLink className="nav-link" to="/">Search</NavLink>
        </div></>) }
    </div>
    )
}

export default Sidebar;