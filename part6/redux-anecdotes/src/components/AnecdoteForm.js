import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";
import "../style.css";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(anecdoteContent);
    dispatch(createAnecdote(newAnecdote));
    dispatch(createNotification(`${anecdoteContent} was successfully added.`));

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
