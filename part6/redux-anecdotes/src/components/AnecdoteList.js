import React from "react";
import "../style.css";
import { votesToAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    console.log("vote", id);
    dispatch(votesToAnecdote(id));
  };

  return (
    <div className="layout">
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
    </div>
  );
};

export default AnecdoteList;
