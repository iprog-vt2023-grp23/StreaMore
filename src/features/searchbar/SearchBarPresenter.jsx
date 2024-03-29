import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  searchFilms,
  searchFilmsService,
  setStateCountry,
  getCountry,
  setStateKeyword,
} from "../searchPage/searchSlice";
import {
  getAvailableServices,
  getStreamingServices,
} from "../userPage/userPageSlice";

import country_codes_array from "../searchPage/CountryCodes";

import SearchBarView from "./SearchBarView";
import "./SearchBar.css";

import { Toast } from "primereact/toast";

import FirebaseApp from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [service, setService] = useState();
  const country = useSelector(getCountry);
  const streamingServices = useSelector(getAvailableServices);
  const myServices = useSelector(getStreamingServices);
  const [searchRequestStatus, setSearchRequestStatus] = useState("idle");
  const [countryVisible, setCountryVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);

  const countryOptions = Object.keys(country_codes_array).map((key) => ({
    name: country_codes_array[key],
    code: key,
  }));

  const toast = useRef(null);
  const auth = getAuth(FirebaseApp);
  const [authState, setAuthState] = useState(auth.currentUser);

  useEffect(() => {
    setAuthState(auth.currentUser);
  }, [auth.currentUser]);

  const navigate = useNavigate();

  //Functions for changing the current sate as well as setting the store state
  const keywordChanged = (e) => setKeyword(e.target.value);
  const countryChanged = (e) => {
    //Finds the two letter country code from the full country name (looks more wack than it is)
    if (e.target.value) {
      const toAdd = Object.keys(country_codes_array)
        .find((key) => country_codes_array[key] === e.target.value["name"])
        .toLowerCase();
      dispatch(setStateCountry(toAdd));
    } else {
      dispatch(setStateCountry(""));
    }
  };


  const servicesChanged = (e) => setService(e.target.value);

  //Function for the search button
  const search = () => {
    if (!keyword && country) {
      toast.current.show({
        severity: "info",
        summary: "Info Message",
        detail: "Please enter a movie in the search field",
        life: 3000,
      });
    } else if (keyword && !country) {
      toast.current.show({
        severity: "info",
        summary: "Info Message",
        detail: "Please select a country",
        life: 3000,
      });
    } else if (!keyword && !country) {
      toast.current.show({
        severity: "info",
        summary: "Info Message",
        detail: "Please enter a movie in the search field and select a country",
        life: 3000,
      });
    } else if (service && service["code"] != "-1") {
      // All services use standard search
      searchByService();
    } else {
      searchByTitle();
    }
  };

  const searchByTitle = () => {
    if (searchRequestStatus === "idle") {
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
        // console.log(err);
      } finally {
        setSearchRequestStatus("idle");
      }
    }
  };

  const searchByService = () => {
    //Don't allow user to spam search button faster than a response can be received
    if (searchRequestStatus === "idle") {
      try {
        setSearchRequestStatus("pending");
        let serviceFilter = "";
        /*
                    Change parameters for the search here! Parameters can be found on https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability 
                */
        if (service) {
          if (service["code"] == -2) {
            // All my services
            serviceFilter =
              myServices
                .filter((service) => isNaN(service))
                .join(".subscription%2C") + ".subscription";
          } else {
            serviceFilter = service["name"] + ".subscription";
          }
        }

        dispatch(
          searchFilmsService([
            "country=" + country,
            "services=" + serviceFilter,
            "keyword=" + keyword,
          ])
        ).unwrap();
        dispatch(setStateKeyword(keyword));
        setKeyword("");
      } catch (err) {
        // console.log(err);
      } finally {
        setSearchRequestStatus("idle");
      }
    }
  };

  //Function for searching when the enter key is pressed down
  function keyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); //Dont reload the page
      search();
    }
  }

  // myServices = [{name: streaminServices[key], code: key]}]
  const allServices = Object.keys(streamingServices).map((key) => ({
    name:
      streamingServices[key].charAt(0).toUpperCase() +
      streamingServices[key].slice(1),
    code: key,
  }));

  allServices.unshift({ name: "All Services", code: -1 });
  if (authState != null) {
    allServices.unshift({ name: "All My Services", code: -2 });
  }

  const filter_items = [
    {
      label: "Filter Services",
      icon: "pi pi-filter",
      visible: !servicesVisible,
      command: () => {
        setServicesVisible(true);
      },
    },
    {
      label: "Filter Services",
      icon: "pi pi-minus",
      visible: servicesVisible,
      command: () => {
        setServicesVisible(false);
      },
    },
    {
      label: "Filter Country",
      icon: "pi pi-filter",
      visible: !countryVisible,
      command: () => {
        setCountryVisible(true);
      },
    },
    {
      label: "Filter Country",
      icon: "pi pi-minus",
      visible: countryVisible,
      command: () => {
        setCountryVisible(false);
      },
    },
  ];

  return (
    <div>
      <Toast ref={toast} position="top-left" />
      <SearchBarView
        country_codes_array={country_codes_array}
        services={allServices}
        country={country}
        service={service}
        keyword={keyword}
        countryOptions={countryOptions}
        filter_items={filter_items}
        countryVisible={countryVisible}
        servicesVisible={servicesVisible}
        onKeywordChanged={keywordChanged}
        onKeyDown={keyDown}
        onSearch={search}
        onCountryChanged={countryChanged}
        onServiceChanged={servicesChanged}
      />
    </div>
  );
};

export default SearchBar;
