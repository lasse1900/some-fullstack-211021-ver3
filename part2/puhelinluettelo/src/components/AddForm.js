import React from "react";

const AddForm = ({
  addPerson,
  newName,
  newNumber,
  nameChange,
  numberChange,
}) => (
  <form onSubmit={addPerson} name={newName}>
    <div>
      name: <input value={newName} onChange={nameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={numberChange} />
    </div>
    <div>
      <br />
      <button type="submit">add</button>
    </div>
  </form>
);

export default AddForm;