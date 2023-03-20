import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarState, toggleSidebar } from './sidebarSlice';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const sidebarState = useSelector(getSidebarState);

    //Inverts the sidebar state to toggle it
    const sidebarButtonClick = () => {
        dispatch(toggleSidebar())
    }

    //Returns a button if the sidebar is not toggled
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

    /*
    *Renders a button if the sidebar is not toggled or navigation links if it is
    *NavLink uses BrowserRouter to navigate to different pages the "to=" matches with a route in App.jsx
    */
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