import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import "../style.css";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    console.log("->", event.target.anecdote.value);
    const anecdoteContent = event.target.anecdote.value;
    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(createNotification(`${anecdoteContent} was successfully added.`));
    event.target.anecdote.value = "";

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button action="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
