import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import personService from "./services/persons";
import ErrorMessage from "./components/ErrorMessage";
import Notification from "./components/Notification";
import AddForm from "./components/AddForm";
import PersonsList from "./components/PersonsList";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState("");
  const [filteredList, setFilteredList] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredList(initialPersons);
    });
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
    setFilteredList(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const nameChange = event => { setNewName(event.target.value) };
  const numberChange = event => { setNewNumber(event.target.value) };

  const addPerson = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;

    if (persons.map(person => person.name.toLowerCase()).includes(name.toLocaleLowerCase())) {
      if (window.confirm(`${name} is already added to the phonebook, do you want to change info?`)) {
        const id = persons.filter(person => person.name === name)[0].id;
        const personObject = {
          id: id,
          name: name,
          number: number
        };
        personService
          .update(id, personObject)
          .then(updatePerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatePerson));
            setFilteredList(persons.map(person => person.id !== id ? person : updatePerson));
            setNewFilter('');
            setNotificationMessage(`Person ${name} contact info changed`)
            setTimeout(() => { setNotificationMessage(null) }, 4000);
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => { setErrorMessage(null) }, 4000);
          });
      }
      setNewName('');
      setNewNumber('');
    } else {
      const personObject = { name, number };
      personService
        .create(personObject)
        .then(returnedPerson => {
          setFilteredList(persons.concat(returnedPerson));
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Person ${name} added to phonebook`)
          setTimeout(() => { setNotificationMessage(null) }, 4000)
        }).catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => { setErrorMessage(null) }, 4000);
        })
      setNewName('')
      setNewNumber('')
    }
  };

  const removePerson = (person) => {
    const confirmDeletion = window.confirm(
      `Do you want to delete ${person.name} from phonebook?`
    );
    if (confirmDeletion) {
      personService
        .remove(person.id)
        .then((response) => setPersons(response.data))
        .then((response) => {
          setNotificationMessage(
            `Person ${person.name} deleted from phonebook`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 4000);
        })
        .catch((error) => {
          setErrorMessage("Person already removed");
          console.log(error.response.data)
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
      setTimeout(refreshPage, 3000);
    }
  };

  return (
    <>
      <h2>New Phonebook</h2>
      <div>
        <ErrorMessage errorMessage={errorMessage} />
        <Notification notificationMessage={notificationMessage} />
        <Filter newFilter={newFilter} handleFilter={handleFilter} />
        <div>
          <div>
            <AddForm
              addPerson={addPerson}
              newName={newName}
              newNumber={newNumber}
              nameChange={nameChange}
              numberChange={numberChange}
            />
          </div>
        </div>
      </div>
      <div>
        <br />
        <PersonsList persons={filteredList} removePerson={removePerson} />
      </div>
      <div></div>
    </>
  );
};

export default App;
