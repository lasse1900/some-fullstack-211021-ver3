const PhonebookList = ({persons, newFilter, removePerson}) => {

  if (!persons.length) {
    return <></>;
  }

  return (
    <div>
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

export default PhonebookList;