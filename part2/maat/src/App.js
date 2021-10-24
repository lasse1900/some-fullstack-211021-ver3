import React, { useEffect, useState } from "react";
import axios from "axios";

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

      {filteredCountries.length === 1 && (
        <div>
          <h2>{filteredCountries[0].name}</h2>
          <ul style={{ listStyle: "none" }}>
            <li key={filteredCountries[0].capital}>
              <span>Capital: {filteredCountries[0].capital}</span>
            </li>
            <li key={filteredCountries[0].population}>
              <span>Population: {filteredCountries[0].population}</span>
            </li>
            <ul>
              {filteredCountries[0].languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
          </ul>
          <img src={filteredCountries[0].flag} alt={filteredCountries[0].name} width='150' />
        </div>
      )}

      {filteredCountries.length > 10 && (
        <span>Too many matches, specify more accurately</span>
      )}
    </div>
  );
};

export default App;
