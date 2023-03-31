import "./SearchBar.css";


import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';
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
  console.log(props.country_codes_array[props.country.toUpperCase()]);
  // convert country codes to array with only values from the object
//   const countryy_codes_array = [
//     { name: 'New York', code: 'NY' },
//     { name: 'Rome', code: 'RM' },
//     { name: 'London', code: 'LDN' },
//     { name: 'Istanbul', code: 'IST' },
//     { name: 'Paris', code: 'PRS' }
// ];
  // convert props.country_codes_array to object of type {name: value, code: key}
  const countryy_codes_array = Object.keys(props.country_codes_array).map((key) => {
    return {name: props.country_codes_array[key], code: key}
  })
  console.log(countryy_codes_array)
  // const current = "element in countryy_codes_array with code = props.country.toUpperCase()"
  const current = countryy_codes_array.find((element) => element.code === props.country.toUpperCase())
  console.log(current)
  return (
    <section className="searchBar">
      {/* <h2>Search</h2> */}
      <form>
        <span className="p-float-label">
          <InputText id="search" className="searchinput" value={props.keyword} onChange={keywordChanged}/>
          <label htmlFor="search">Search for a film</label>
        </span>
        {/* <label htmlFor="country">Country</label> */}
        <div>
          {/* <select
            id="country"
            value={props.country_codes_array[props.country.toUpperCase()]}
            onChange={props.onCountryChanged}
          >
            <option value=""></option>
            {props.countryOptions}
          </select> */}
           <SplitButton text raised menuButtonClassName="jaj" buttonClassName="jaj" label="Search" disabled={!props.keyword} icon="pi pi-search" onClick={props.onSearch} model={items}></SplitButton>
          <span className="p-float-label">
            <Dropdown inputId="dd-country" showClear value={current} onChange={props.onCountryChanged} options={countryy_codes_array} optionLabel="name" className="w-full md:w-14rem" />
            <label htmlFor="dd-country">Select country</label>
          </span>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
