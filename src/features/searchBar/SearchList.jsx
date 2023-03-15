import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchListFormat from "./SearchListFormat";
import { selectAllResults, getResultsStatus, getResultsError, searchFilms } from "./searchSlice";

const SearchList = () => {
    const dispatch = useDispatch();
    let results = useSelector(selectAllResults);
    let status = useSelector(getResultsStatus);
    const error = useSelector(getResultsError);

    let content;
    if(status === 'loading'){
        content = <img src="https://codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif"/>
    } else if(status === 'succeeded'){
        const sortedResults = [...results].sort((a, b) => {return b.imdbRating - a.imdbRating});
        content = sortedResults.map(result => <SearchListFormat key={result.imdbID} result={result} />);
    } else if(status === 'failed'){
        content = <div>{error}</div>;
    }

    return(
        <section>
            <h2>Results</h2>
            {content}
        </section>
    )
}

export default SearchList;