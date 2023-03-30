import "./SearchBar.css";


import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
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

  const items = [
    {
      label: "Filter",
      icon: "pi pi-filter",
    },
  ];

  return (
    <section className="searchBar">
      {/* <h2>Search</h2> */}
      <form>
        <span className="p-float-label">
          <InputText id="username" value={props.keyword} onChange={keywordChanged} />
          <label htmlFor="username">Search for a film</label>
        </span>
        {/* <label htmlFor="country">Country</label> */}
        <div>
          <select
            id="country"
            value={props.country_codes_array[props.country.toUpperCase()]}
            onChange={props.onCountryChanged}
          >
            <option value=""></option>
            {props.countryOptions}
          </select>
          <SplitButton menuButtonClassName="jaj" buttonClassName="jaj" label="Search" disabled={!props.keyword} icon="pi pi-search" onClick={props.onSearch} model={items}></SplitButton>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
