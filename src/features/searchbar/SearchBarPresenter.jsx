import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFilms,
  setStateCountry,
  getCountry,
  setStateKeyword,
} from "../searchPage/searchSlice";
import { getStreamingServices } from "../userPage/userPageSlice"
import country_codes_array from "../searchPage/CountryCodes";
import genre_codes_array from "../searchPage/GenreCodes";
import SearchBarView from "./SearchBarView";
import { BsSearch } from "react-icons/bs";
import { Toast } from 'primereact/toast';
import "./SearchBar.css";
import FirebaseApp from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState();
  const [service, setService] = useState();
  const [searchRequestStatus, setSearchRequestStatus] = useState("idle");
  const country = useSelector(getCountry);
  const toast = useRef(null);
  const auth = getAuth(FirebaseApp);
  const navigate = useNavigate();
  //Functions for changing the current sate as well as setting the store state
  const keywordChanged = (e) => setKeyword(e.target.value);
  const countryChanged = (e) => {
    //Finds the two letter country code from the full country name (looks more wack than it is)
    if (e.target.value) {
      const toAdd = Object.keys(country_codes_array)
        .find((key) => country_codes_array[key] === e.target.value['name'])
        .toLowerCase();
      dispatch(setStateCountry(toAdd));
    }
    else {
      dispatch(setStateCountry(""));
    }
  };

  const genreChanged = (e) => setGenre(e.target.value);
  
  const servicesChanged = (e) => setService(e.target.value);

  //Function for the search button
  const search = () => {
    //Don't allow user to spam search button faster than a response can be received
    if (searchRequestStatus === "idle" && keyword && country) {
      try {
        setSearchRequestStatus("pending");
        /* 
                    Change parameters for the search here! Parameters can be found on https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability
                */
        dispatch(
          searchFilms([
            "title=" + keyword,
            "services=netflix",
            "country=" + country,
          ])
        ).unwrap();
        dispatch(setStateKeyword(keyword));
        setKeyword("");
      } catch (err) {
        console.log(err);
      } finally {
        setSearchRequestStatus("idle");
      }
    }
    else if (!keyword && country) {
      toast.current.show({ severity: 'info', summary: 'Info Message', detail: 'Please enter a movie in the search field', life: 3000 });
    }
    else if (keyword && !country) {
      toast.current.show({ severity: 'info', summary: 'Info Message', detail: 'Please select a country', life: 3000 });
    }
    else {
      toast.current.show({ severity: 'info', summary: 'Info Message', detail: 'Please enter a movie in the search field and select a country', life: 3000 });
    }
  };

  //Function for searching when the enter key is pressed down
  function keyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); //Dont reload the page
      search();
    }
  }
  const streamingServices = useSelector(getStreamingServices);
  // myServices = [{name: streaminServices[key], code: key]}]
  const myServices = Object.keys(streamingServices).map((key) => ({name: streamingServices[key].charAt(0).toUpperCase() + streamingServices[key].slice(1), code: key}));
  // Add name: All Services code: -1 to myServices
  myServices.unshift({name: "All Services", code: -1});
  myServices.unshift({name: "All My Services", code: -2});
  // Capitalise first letter in each service name
  console.log("streams", streamingServices);
  const [countryVisible, setCountryVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [genreVisible, setGenreVisible] = useState(false);

  const filter_items = [
    {
      label: "Sign in to filter",
      icon: "pi pi-sign-in",
      visible: (auth.currentUser == null),
      command: () => {
        navigate("/signIn");
      }
    },
    {
      label: "Filter Services",
      icon: "pi pi-filter",
      visible: !servicesVisible && (auth.currentUser != null),
      command: () => {
        setServicesVisible(true);
      }
    },
    {
      label: "Filter Services",
      icon: "pi pi-minus",
      visible: servicesVisible && (auth.currentUser != null),
      command: () => {
        setServicesVisible(false);
      }
    },
    {
      label: "Filter Country",
      icon: "pi pi-filter",
      visible: !countryVisible && (auth.currentUser != null), 
      command: () => {
        setCountryVisible(true);
      }
    },
    {
      label: "Filter Country",
      icon: "pi pi-minus",
      visible: countryVisible && (auth.currentUser != null), 
      command: () => {
        setCountryVisible(false);
      }
    },
    {
      label: "Filter Genre",
      icon: "pi pi-filter",
      visible: !genreVisible && (auth.currentUser != null), 
      command: () => {
        setGenreVisible(true);
      }
    },
    {
      label: "Filter Genre",
      icon: "pi pi-minus",
      visible: genreVisible && (auth.currentUser != null), 
      command: () => {
        setGenreVisible(false);
        console.log("toast", toast.current)
    toast.current.show({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
      }
    },
  ];

  //Function that gets all possible country names from CountryCodes
  // const countryOptions = Object.values(country_codes_array).map((country) => (
  //   <option key={country} value={country}>
  //     {country}
  //   </option>
  // ));
  
  const genreOptions = Object.keys(genre_codes_array).map((key) => ({name: genre_codes_array[key], code: key}));
  const countryOptions = Object.keys(country_codes_array).map((key) => ({name: country_codes_array[key], code: key}));
  
  

  return (
    <div>
    <Toast ref={toast} position="top-left"/>
    <SearchBarView
      country_codes_array={country_codes_array}
      services={myServices}
      country={country}
      genre={genre}
      service={service}
      keyword={keyword}
      countryOptions={countryOptions}
      genreOptions={genreOptions}
      filter_items={filter_items}
      countryVisible={countryVisible}
      servicesVisible={servicesVisible}
      genreVisible={genreVisible}
      onKeywordChanged={keywordChanged}
      onKeyDown={keyDown}
      onSearch={search}
      onCountryChanged={countryChanged}
      onGenreChanged={genreChanged}
      onServiceChanged={servicesChanged}
    />
    </div>
  );
};

export default SearchBar;
