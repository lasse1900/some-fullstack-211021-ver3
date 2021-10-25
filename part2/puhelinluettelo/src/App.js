// import React, { useState, useEffect } from "react";
// import Filter from "./components/Filter";
// import PersonForm from "./components/PersonForm";
// import PersonsList from "./components/PersonsList";
// import personService from "./services/persons";
// import "./App.css";

// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [newPerson, setNewPerson] = useState({ name: "", number: "" });
//   const [newFilter, setNewFilter] = useState("");

//   useEffect(() => {
//     personService.getAll().then((initialPersons) => {
//       setPersons(initialPersons);
//     });
//   }, []);

// //   const addPerson = (event) => {
// //     event.preventDefault();

// //     const names = persons.map((person) => person.name.toLowerCase());
// //     if (names.includes(newPerson.name.toLowerCase())) {
// //       const confirmUpdate = window.confirm(
// //         `${newPerson.name} is already added to the phonebook, replace the old number with the new one?`
// //       );

// //       if (confirmUpdate) {
// //         const personWithSameName = persons.find(
// //           (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
// //         );
// //         personService
// //           .update(personWithSameName.id, newPerson)
// //           .then((response) => setPersons(response.data));
// //       }
// //     } else {
// //       personService
// //         .create(newPerson)
// //         .then((response) =>
// //           setPersons((persons) => [...persons, response.data])
// //         );
// //     }
// //   };

// const addPerson = (event) => {
//     event.preventDefault();

//     const names = persons.map((person) => person.name.toLowerCase());
//     if (names.includes(newPerson.name.toLowerCase())) {
//       const confirmUpdate = window.confirm(
//         `${newPerson.name} is already added to the phonebook, replace the old number with the new one?`
//       );

//       if (confirmUpdate) {
//         const personWithSameName = persons.find(
//           (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
//         );
//         personService
//           .update(personWithSameName.id, newPerson)
//           .then((response) => setPersons(response.data));
//       }
//     } else {
//         personService
//         .create(newPerson)
//         .then((response) =>
//           setPersons((persons) => [...persons, response.data])
//         );
//     }
//   };

//   const removePerson = (person) => {
//     const confirmDeletion = window.confirm(
//       `Poistetaanko ${person.name} luettelosta?`
//     );
//     if (confirmDeletion) {
//       personService.remove(person.id).then((people) => setPersons(people));
//     }
//   };

//   return (
//     <>
//       <h2>Phonebook</h2>
//       <div>
//         <div>
//           <div>
//             <Filter setNewFilter={setNewFilter} />
//           </div>
//           <div>
//             <PersonForm
//               setNewPerson={setNewPerson}
//               newPerson={newPerson}
//               addPerson={addPerson}
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <PersonsList
//           persons={persons}
//           newFilter={newFilter}
//           removePerson={removePerson}
//         />
//       </div>
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map((person) => person.name.toLowerCase());
    if (names.includes(newPerson.name.toLowerCase())) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phonebook`
      );

      if (confirmUpdate) {
        const allreadyExists = persons.find(
          (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        personService
          .update(allreadyExists.id, newPerson)
          .then((response) => setPersons(response.data));
      }
    } else {
      personService
        .create(newPerson)
        .then((response) =>
          setPersons((persons) => [...persons, response.data])
        );
    }
  };

  const removePerson = (person) => {
    const confirmDeletion = window.confirm(
      `Poistetaanko ${person.name} luettelosta?`
    );
    if (confirmDeletion) {
      personService
        .remove(person.id)
        .then((response) => setPersons(response.data));
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
        <PersonsList
          persons={persons}
          newFilter={newFilter}
          removePerson={removePerson}
        />
      </div>
    </>
  );
};

export default App;
