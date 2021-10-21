import React, { useState } from "react";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "045-2736273672"}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      // setPersons((persons) => [...persons, { name: newName }]);
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label>name:</label>{" "}
          <input value={newName} onChange={handlePersonChange} />
          </div>
          <div>
          <label>number:</label>{" "}
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </div>
  );
};

export default App;
