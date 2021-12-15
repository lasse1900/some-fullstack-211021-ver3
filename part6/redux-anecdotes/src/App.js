import React from "react";
import { votesToAnecdote } from "./reducers/anecdoteReducer";
import "./style.css";

const App = (props) => {
  const anecdotes = props.store.getState();

  const vote = (id) => {
    console.log("vote", id);
    props.store.dispatch(votesToAnecdote(id));
  };

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
    <div className="layout">
      <h2>Anecdotes</h2>
      <div className="anecdote-list">
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div className="vote-count">
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>

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

export default App;
