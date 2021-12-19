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
    <div className="form-row">
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input className="input" name="anecdote" />
        </div>
        <div className="create-btn">
          <button action="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
