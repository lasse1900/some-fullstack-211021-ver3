import React from "react";
const Filter = ({ searchQuery, setNewFilter }) => {
  return (
    <div>
      <label>filter:</label>
      <input
        value={searchQuery}
        onChange={(event) => setNewFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;