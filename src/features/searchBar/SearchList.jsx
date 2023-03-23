import { useSelector, useDispatch } from "react-redux";
import RenderMovie from "../../renderFunctions/RenderMovie";
import { selectAllResults, getResultsStatus, getResultsError, getKeyword } from "./searchSlice";
import "./SearchList.css"
import {BiLoaderCircle} from 'react-icons/bi'


const SearchList = () => {
    const dispatch = useDispatch();
    let results = useSelector(selectAllResults);
    let status = useSelector(getResultsStatus);
    const error = useSelector(getResultsError);
    const keyword = useSelector(getKeyword);


    let content;
    // Either render a loading gif, the search result or an error depending on the status
    if(status === 'loading'){
        // content = <img src="https://codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif"/>
        content = <BiLoaderCircle className="loadingCircle"/>;
    } else if(status === 'succeeded'){
        //Spreads the results array and sorts it by imdb rating
        //const sortedResults = [...results].sort((a, b) => {return b.imdbVoteCount - a.imdbVoteCount});
        //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object

        content = sortedResults.map(result => <div className="movieCard"><RenderMovie  key={result.imdbId} result={result} /></div>);

    } else if(status === 'failed'){
        content = <div>{error}</div>;
    }

    return(
        <section className="searchList">
            <h2>Search for "{keyword}"</h2>
            <div className="searchResults">{content}</div>
        </section>
    )
}

export default SearchList;