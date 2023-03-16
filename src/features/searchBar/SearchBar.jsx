import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilms, setStateCountry, getCountry, setStateKeyword} from "./searchSlice";
import country_codes_array from "./CountryCodes";
import {BsSearch} from 'react-icons/bs'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [country, setCountry] = useState(useSelector(getCountry));
    const [searchRequestStatus, setSearchRequestStatus] = useState('idle');

    const onKeywordChanged = e => setKeyword(e.target.value);
    const onCountryChanged = (e) => {
        const toAdd = Object.keys(country_codes_array).find(key => country_codes_array[key] === e.target.value).toLowerCase()
        console.log(toAdd)
        setCountry(toAdd);
        dispatch(setStateCountry(toAdd));
    };

    const search = () => {
        if(searchRequestStatus === 'idle'){
            try {
                setSearchRequestStatus('pending')
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
    function keyDown(e){ //to search using enter key
        if (e.key === 'Enter') {
            console.log('clicked enter button');
            e.preventDefault();
            search();
        }
    }
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