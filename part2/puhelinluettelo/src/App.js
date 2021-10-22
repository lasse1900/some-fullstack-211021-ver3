import React, { useState } from "react";
import "./App.css";

const Filter = ({ setNewFilter }) => {
  return (
    <div>
      <label>filter:</label>
      <input onChange={(event) => setNewFilter(event.target.value)} />
    </div>
  );
};

const PersonForm = ({ setNewPerson, newPerson, addPerson }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new</h2>
          <label>name:</label>
          <input
            onChange={(event) =>
              setNewPerson({ ...newPerson, name: event.target.value })
            }
          />
        </div>
        <div>
          <label>number:</label>
          <input
            onChange={(event) =>
              setNewPerson({ ...newPerson, number: event.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const PersonsList = ({ persons, newFilter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
          )
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

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