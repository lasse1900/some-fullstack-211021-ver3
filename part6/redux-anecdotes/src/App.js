import React from "react";
import { votesToAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import "./style.css";

const App = (props) => {
  const anecdotes = props.store.getState();

  const vote = (id) => {
    console.log("vote", id);
    props.store.dispatch(votesToAnecdote(id));
  };

  return (
    <div className="layout">
      <h2>Anecdotes</h2>
      <div className="anecdote-list">
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div className="vote-count">
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))}
      </div>
      <AnecdoteForm store={props.store} />
    </div>
  );
};

export default App;