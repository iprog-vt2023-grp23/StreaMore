import { useSelector } from "react-redux";
import { getResultsStatus } from "../model/searchSlice";
import SearchList from "../presenter/SearchList";
import SearchBar from "../presenter/SearchBar";
import "./Search.css"

const Search = () => { 
    let status = useSelector(getResultsStatus);
    const SearchCentered = () => {
        return (
            <div className="searchCentered">
                <h1>StreaMore</h1>
                <h4><i>Stream more, search less</i></h4>
                <SearchBar />
            </div>
            )  
    }

    const SearchAndResults = () => {
        return (
            <div className="searchAndResults">
                <SearchBar />
                <SearchList />
            </div>
        )
    }

    return (
        <>
            {status === 'idle' ? <SearchCentered /> : <SearchAndResults />}
        </>
    )
}

export default Search
