import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, searchFilms, setStateCountry} from "./searchSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [country, setCountry] = useState('se');
    const [searchRequestStatus, setSearchRequestStatus] = useState('idle');

    const countries = Object.values(useSelector(getCountries));

    const onKeywordChanged = e => setKeyword(e.target.value);
    const onCountryChanged = (e) => {
        setCountry(e.target.value);
        dispatch(setStateCountry(e.target.value));
    };

    const search = () => {
        if(searchRequestStatus === 'idle'){
            try {
                setSearchRequestStatus('pending')
                dispatch(searchFilms(['service=netflix&type=movie','keyword=' + keyword, 'country=' + country])).unwrap();
                setKeyword('');
            } catch(err){
                console.log(err);
            } finally {
                setSearchRequestStatus('idle');
            }
        }
    }

    //Get countries and remove duplicates
    const countryOptions = [...new Set(countries.flat(1))].sort().map(country => (
        <option key={country} value={country}>
            {country}
        </option>
    ))

    return(
        <section>
            <h2>Search</h2>
            <form>
                <label>Movie Title</label>
                <input 
                    type="text"
                    id="movieTitle"
                    name="movieName"
                    value={keyword}
                    onChange={onKeywordChanged}/>
                <label htmlFor="country">Country</label>
                <select id="country"  value={country} onChange={onCountryChanged}>
                    <option value=""></option>
                    {countryOptions}
                </select>
                <button type="button" onClick={search}>Search</button>
            </form>
        </section>
    )
}

export default SearchBar