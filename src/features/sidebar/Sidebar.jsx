import '../../App.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarState, toggleSidebar } from './sidebarSlice';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const[sidebarState, setSidebarState] = useState(useSelector(getSidebarState));
    console.log(sidebarState)

    const sidebarButtonClick = () => {
        setSidebarState(!sidebarState);
        dispatch(toggleSidebar())
    }

    const sidebarButton = () => {
        if(!sidebarState){
            return(
                <button onClick={sidebarButtonClick}>
                    Button
                </button>
            )
        }
        return false;
    }

    return (sidebarButton() ||
        <div className='SidebarButtons'>
            <button onClick={sidebarButtonClick}>Close</button>
            <NavLink to="/">Search</NavLink>
            <NavLink to="/movieList">List</NavLink>
            <NavLink to="/userPage">User</NavLink>
            <NavLink to="/">Search</NavLink>
        </div>
    )
}

export default Sidebar;