import React, { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      setPersons((persons) => [...persons, newPerson]);
    }
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