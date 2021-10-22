export const Filter = ({ setNewFilter }) => {
    return (
      <div>
        <label>filter:</label>
        <input onChange={(event) => setNewFilter(event.target.value)} />
      </div>
    );
  };
  