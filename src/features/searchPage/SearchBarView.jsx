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

  const country_codes = Object.keys(props.country_codes_array).map((key) => {
    return {name: props.country_codes_array[key], code: key}
  })

  const current = country_codes.find((element) => element.code === props.country.toUpperCase())
  console.log(current)
  return (
    <section className="searchBar">
      {/* <h2>Search</h2> */}
      <form>
        <span className="p-float-label">
          <InputText id="search" className="searchinput" value={props.keyword} onChange={keywordChanged}/>
          <label htmlFor="search">Search for a film</label>
        </span>
        <div>
           <SplitButton text raised menuButtonClassName="jaj" buttonClassName="jaj" label="Search" disabled={!props.keyword} icon="pi pi-search" onClick={props.onSearch} model={items}></SplitButton>
          <span className="p-float-label">
            <Dropdown inputId="dd-country" showClear value={current} onChange={props.onCountryChanged} options={country_codes} optionLabel="name" className="w-full md:w-14rem" />
            <label htmlFor="dd-country">Select country</label>
          </span>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
