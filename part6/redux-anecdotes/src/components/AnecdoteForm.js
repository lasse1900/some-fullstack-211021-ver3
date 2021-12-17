import React from "react";
import { useDispatch } from "react-redux";
import "../style.css";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    console.log("->", event.target.anecdote.value);
    dispatch({
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
