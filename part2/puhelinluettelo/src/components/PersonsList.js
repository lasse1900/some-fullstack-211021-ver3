export const PersonsList = ({ persons, newFilter }) => {
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