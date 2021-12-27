import React from "react";
import { useDispatch, connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import "../style.css";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const create = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.createAnecdote(anecdoteContent);
    props.setNotification(`you added ${anecdoteContent}`);
    setTimeout(() => dispatch(clearNotification()), 5000);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
