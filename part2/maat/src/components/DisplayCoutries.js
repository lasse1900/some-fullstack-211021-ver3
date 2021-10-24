import React from "react";
import Weather from "./Weather";

const DisplayCoutries = (props) => {
  const { filteredCountries } = props;
  return filteredCountries.length === 1 ? (
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
      <img
        src={filteredCountries[0].flag}
        alt={filteredCountries[0].name}
        width="150"
      />
      <Weather
        country={filteredCountries[0].name}
        capital={filteredCountries[0].capital}
      />
    </div>
  ) : (
    filteredCountries.length > 10 && (
      <span>Too many matches, specify more accurately</span>
    )
  );
};

export default DisplayCoutries;
