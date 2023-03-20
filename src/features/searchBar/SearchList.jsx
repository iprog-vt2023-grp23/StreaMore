import { useEffect } from "react";
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
        const sortedResults = [...results].sort((a, b) => {return b.imdbRating - a.imdbRating});
        //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object
        content = sortedResults.map(result => <RenderMovie className="movieCard" key={result.imdbId} result={result} />);
    } else if(status === 'failed'){
        content = <div>{error}</div>;
    }

    return(
        <section className="searchList">
            {content ? <h2>Results for {keyword}</h2> : ""}
            {content}
        </section>
    )
}

export default SearchList;