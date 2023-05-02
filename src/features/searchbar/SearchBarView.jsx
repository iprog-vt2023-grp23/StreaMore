import "./SearchBar.css";


import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';

import { useState } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

const SearchBarView = (props) => {
  const keyDown = (e) => {
    props.onKeyDown(e);
  };
  const keywordChanged = (e) => {
    props.onKeywordChanged(e);
  };

  const [countryVisible, setCountryVisible] = useState(false);

  const items = [
    {
      label: "Filter Country",
      icon: "pi pi-filter",
      visible: !countryVisible, // om inte tryckt på FLYTTA UT TILL PRESENTER
      command: () => {
        setCountryVisible(true);
      }
    },
    {
      label: "Filter Country",
      icon: "pi pi-minus",
      visible: countryVisible, // om inte tryckt på FLYTTA UT TILL PRESENTER
      command: () => {
        setCountryVisible(false);
      }
    }
  ];

  const country_codes = Object.keys(props.country_codes_array).map((key) => {
    return {name: props.country_codes_array[key], code: key}
  })

  const current = country_codes.find((element) => element.code === props.country.toUpperCase())
  console.log(current)
  return (
    <section className="searchBar">
      {/* <h2>Search</h2> */}
      <form>
        <div>
        <div>
          <span className="p-float-label">
            <InputText id="search" className="searchinput" value={props.keyword} onChange={keywordChanged} onKeyDown={keyDown}/>
            <label htmlFor="search">Search for a film</label>
          </span>
        </div>
        <div>
        <span className="p-float-label" style={{'margin-top':`40px`}}>
            {countryVisible ? <Dropdown inputId="dd-country" showClear value={current} onChange={props.onCountryChanged} options={country_codes} optionLabel="name" className="w-full md:w-14rem" />: null}
          </span>
           
        </div>
        </div>
        <div>
        <SplitButton text raised menuButtonClassName="jaj" buttonClassName="jaj" disabled={/*!props.keyword*/false} icon="pi pi-search" onClick={props.onSearch} model={items}></SplitButton>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
