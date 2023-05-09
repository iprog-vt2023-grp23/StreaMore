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

  const country = props.countryOptions.find((element) => element.code === props.country.toUpperCase())
  
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
        <span className="p-float-label" style={{'marginTop':`40px`}}>
            {props.servicesVisible ? <div style={{"display":"flex"}}><Dropdown inputId="dd-service" showClear value={props.service} onChange={props.onServiceChanged} options={props.services} optionLabel="name" className="w-full md:w-14rem" /> <label style={{"paddingLeft":"10px"}} htmlFor="dd-service">Service</label>  </div>: null}
        </span>
        <span className="p-float-label" style={{'marginTop':`40px`}}>
            {props.countryVisible ? <div style={{"display":"flex"}}><Dropdown inputId="dd-country" showClear value={country} onChange={props.onCountryChanged} options={props.countryOptions} optionLabel="name" className="w-full md:w-14rem" /> <label style={{"paddingLeft":"10px"}} htmlFor="dd-country">Country</label> </div>: null}
        </span>
        <span className="p-float-label" style={{'marginTop':`40px`}}>
            {props.genreVisible ? <div style={{"display":"flex"}}><Dropdown inputId="dd-genre" showClear value={props.genre} onChange={props.onGenreChanged} options={props.genreOptions} optionLabel="name" className="w-full md:w-14rem" /> <label style={{"paddingLeft":"10px"}} htmlFor="dd-genrey">Genre</label> </div>: null}
        </span>
        </div>
        </div>
        <div>
        <SplitButton text raised menuButtonClassName="jaj" buttonClassName="jaj" disabled={/*!props.keyword*/false} icon="pi pi-search" onClick={props.onSearch} model={props.filter_items}></SplitButton>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
