import React from "react";
import PersonForm from "./PersonForm";

const PersonsList = ({ persons, removePerson, changeNumber }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonForm
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          removePerson={removePerson}
          changeNumber={changeNumber}
        />
      ))}
    </div>
  );
};

export default PersonsList;
