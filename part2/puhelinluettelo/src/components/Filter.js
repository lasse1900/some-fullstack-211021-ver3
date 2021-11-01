import React from "react";

const Filter = ({ newFilter, handleFilter }) => (
    <p>
      filter:<input value={newFilter} onChange={handleFilter} />
    </p>
  );

  export default Filter;