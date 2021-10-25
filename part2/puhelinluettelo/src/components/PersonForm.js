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

  export default PersonForm;