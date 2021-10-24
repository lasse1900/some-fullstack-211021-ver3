import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCoutries from "./components/DisplayCoutries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countriesUrl = "https://restcountries.com/v2/all";

  useEffect(() => {
    axios.get(countriesUrl).then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
      console.log(response.data);
    });
  }, []);

  const filterCountries = (countyName) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(countyName)
      )
    );
  };

  return (
    <div>
      <span>Find countries:</span>
      <input
        type="text"
        onChange={(event) =>
          filterCountries(event.target.value.toLocaleLowerCase())
        }
      />
      <br />
      <DisplayCoutries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
