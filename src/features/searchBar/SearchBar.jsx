import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilms, setStateCountry, getCountry, setStateKeyword} from "./searchSlice";
import country_codes_array from "./CountryCodes";
import {BsSearch} from 'react-icons/bs'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [searchRequestStatus, setSearchRequestStatus] = useState('idle');
    const country = useSelector(getCountry);

    //Functions for changing the current sate as well as setting the store state
    const onKeywordChanged = e => setKeyword(e.target.value);
    const onCountryChanged = (e) => {
        //Finds the two letter country code from the full country name (looks more wack than it is)
        const toAdd = Object.keys(country_codes_array).find(key => country_codes_array[key] === e.target.value).toLowerCase()
        dispatch(setStateCountry(toAdd));
    };

    //Function for the search button
    const search = () => {
        //Don't allow user to spam search button faster than a response can be received
        if(searchRequestStatus === 'idle'){
            try {
                setSearchRequestStatus('pending')
                /* 
                    Change parameters for the search here! Parameters can be found on https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability
                */
                dispatch(searchFilms(['title=' + keyword, 'services=netflix', 'country=' + country])).unwrap();
                dispatch(setStateKeyword(keyword));
                setKeyword('');
            } catch(err){
                console.log(err);
            } finally {
                setSearchRequestStatus('idle');
            }
        }
    }

    //Function for searching when the enter key is pressed down
    function keyDown(e){ 
        if (e.key === 'Enter') {
            console.log('clicked enter button');
            e.preventDefault(); //Dont reload the page
            search();
        }
    }

    //Function that gets all possible country names from CountryCodes
    const countryOptions = Object.values(country_codes_array).map(country => (
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
                    onChange={onKeywordChanged}
                    onKeyDown={keyDown}/>
                <label htmlFor="country">Country</label>
                <select id="country"  value={country_codes_array[country.toUpperCase()]} onChange={onCountryChanged}>
                    <option value=""></option>
                    {countryOptions}
                </select>
                <button type="button" onClick={search}><BsSearch /></button>
            </form>
        </section>
    )
}

export default SearchBar