import React from "react";
import "../style.css";

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    console.log("->", event.target.anecdote.value);
    props.store.dispatch({
      type: "NEW_ANECDOTE",
      data: { content: event.target.anecdote.value },
    });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button action="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
