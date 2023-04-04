import { useSelector } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists } from "./movieListsSlice";

const MyListsPage = () => {
  const movieLists = useSelector(getMovieLists);
  console.log(movieLists)
  return <MyListsPageView movieLists={movieLists}/>
};

export default MyListsPage;
