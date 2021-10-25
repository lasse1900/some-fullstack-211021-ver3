const PersonsList = ({ persons, newFilter, removePerson }) => {
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
              <button onClick={() => removePerson(person)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PersonsList;