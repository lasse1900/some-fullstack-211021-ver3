const generateId = () => (100000 * Math.random()).toFixed(0);

export const votesToAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content,
      id: generateId(),
    },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      const newAnecdote = {
        content: action.data.content,
        id: generateId(),
        votes: 0,
      };
      return state.concat(newAnecdote);
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
