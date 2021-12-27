import anecdoteService from "../services/anecdotes";

export const votesToAnecdote = (id) => {
  console.log("anecdoteReducer - votedAnecdote id:", id);
  return async (dispatch) => {
    const oldAnecdote = await anecdoteService.getSingle(id);
    const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
    await anecdoteService.update(updatedAnecdote);

    dispatch({
      type: "UPDATE",
      data: { anecdote: updatedAnecdote },
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create({content, votes: 0});
    dispatch({
      type: "NEW_ANECDOTE",
      data: {anecdote},
    });
  };
};


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: {anecdotes},
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data.anecdote);
    case "UPDATE":
      const updatedAnecdote = action.data.anecdote;
      return state
        .map((a) => (a.id !== updatedAnecdote.id ? a : updatedAnecdote))
    case "INIT_ANECDOTES":
      return state.concat(action.data.anecdotes);
    default:
      return state;
  }
};

export default anecdoteReducer;