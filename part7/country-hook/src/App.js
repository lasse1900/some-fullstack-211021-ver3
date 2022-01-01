import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [countries, setCountries] = useState([]);
  const countriesUrl = `https://restcountries.com/v2/name/${name}?fullText=true`;

  useEffect(() => {
    if (name) {
      axios.get(countriesUrl).then(
        (response) => {
          setCountries(response.data);
        },
        () => setCountries([])
      );
    }
  }, [name, countriesUrl]);

  return {
    countries: countries,
    found: countries.length
  };
};

const Country = (country) => (
  <li key={country.name}>
    <h3>{country.name} </h3>
    <div>capital {country.capital} </div>
    <div>population {country.population}</div>
    <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
  </li>
);

const Countries = ({ country }) => {
  if (!country) {
    return null;
  }
  if (!country.found) {
    return <div>No countries found</div>;
  }
  return <ul>{country.countries.map((country) => Country(country))}</ul>;
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Countries country={country} />
    </div>
  );
};

export default App;
