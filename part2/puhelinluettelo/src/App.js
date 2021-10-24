import React, { useState, useEffect } from "react";
import axios from "axios";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      axios
      .post('http://localhost:3001/persons',newPerson)
      .then(response => 
        setPersons((persons) => [...persons, newPerson]));
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
