import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";
import personService from "./services/persons";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }
    personService
      .create(newPerson)
      .then((response) => setPersons((persons) => [...persons, newPerson]));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        <div>
          <div>
            <Filter setNewFilter={setNewFilter} />
          </div>
          <div>
            <PersonForm
              setNewPerson={setNewPerson}
              newPerson={newPerson}
              addPerson={addPerson}
            />
          </div>
        </div>
      </div>
      <div>
        <PersonsList persons={persons} newFilter={newFilter} />
      </div>
    </>
  );
};

export default App;
