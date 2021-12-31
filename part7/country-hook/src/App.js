import React, { useState, useEffect } from "react";
import axios from "axios";
import { useField } from "./hooks/useField";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {});

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const country = useCountry(name);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

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
