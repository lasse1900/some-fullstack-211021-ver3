import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personService from "./services/persons";
import ErrorMessage from "./components/ErrorMessage";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map((person) => person.name.toLowerCase());
    if (names.includes(newPerson.name.toLowerCase())) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phonebook, do you want to change info?`
      );

      if (confirmUpdate) {
        const allreadyExists = persons.find(
          (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        personService
          .update(allreadyExists.id, newPerson)
          .then((response) => setPersons(response.data))
          .then((response) => {
            setNotificationMessage(
              `Person ${newPerson.name} contact info changed`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 4000);
          })
          .catch((error) => {
            setErrorMessage("Error, please check the input .", error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((response) =>
          setPersons((persons) => [...persons, response.data])
        )
        .then((response) => {
          setNotificationMessage(`Person ${newPerson.name} added to phonebook`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 4000);
        })
        .catch((error) => {
          setErrorMessage("Error, please check the input ..", error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
    }
    setTimeout(refreshPage, 3000);
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
        <PersonsList
          persons={persons}
          newFilter={newFilter}
          removePerson={removePerson}
        />
      </div>
      <div></div>
    </>
  );
};

export default App;
