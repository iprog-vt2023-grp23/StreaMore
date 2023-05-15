import Search from "./features/searchPage/SearchPresenter";
import UserPage from "./features/userPage/UserPagePresenter";
import MyLists from "./features/userLists/MyListsPagePresenter";
import InspectMovie from "./features/inspectMovie/InspectMoviePresenter";
import SignIn from "./features/signIn/SignInPresenter";
import Firebase from "./firebase/Firebase";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Sidebar from "./features/sidebar/SidebarPresenter";

function App() {
 
  return (
    <div className="App">
      {/*BrowserRouter is a wrapper class that handles navigation, it enables the use of NavLink*/}
      <BrowserRouter>
        {/*Routes contains all Route elements*/}
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/myLists" element={<MyLists />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/inspectMovie" element={<InspectMovie />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
        {/*Sidebar is outside of the Routes since it will always be visible*/}
        <Sidebar />
        <Firebase />
      </BrowserRouter>
    </div>
  );
}

export default App;
