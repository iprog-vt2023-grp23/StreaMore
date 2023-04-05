import { useSelector, useDispatch } from "react-redux";
import MyListsPageView from "./MyListsPageView";
import { getMovieLists, selectMovieList, getSelectedList } from "./movieListsSlice";
import { useEffect } from "react";

const MyListsPage = () => {
  const movieLists = useSelector(getMovieLists);
  const selectedList = useSelector(getSelectedList);
  const dispatch = useDispatch();
  const selectList = (list) => {
    dispatch(selectMovieList(list.name))
  }

  useEffect(() => {
    if(movieLists.length > 0){
      dispatch(selectMovieList(movieLists[0].name))
    }
  }, [movieLists])

  return <MyListsPageView movieLists={movieLists} selectedList={selectedList} onSelectList={selectList}/>
};

export default MyListsPage;
