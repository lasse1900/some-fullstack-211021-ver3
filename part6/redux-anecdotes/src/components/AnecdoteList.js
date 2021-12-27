import React from "react";
import { connect } from "react-redux";
import { votesToAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import "../style.css";

const AnecdoteList = (props) => {
  const anecdotesToShow = () => {
    if (props.filter.query) {
      return props.anecdotes.filter((anecdote) =>
        anecdote.content.includes(props.filter.query)
      );
    }

    return props.anecdotes;
  };

  const vote = (anecdote) => {
    props.votesToAnecdote(anecdote.id);
    props.setNotification({ text: `You voted: ${anecdote.content}`, delay: 5 });
  };

  return anecdotesToShow()
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id} className="layout">
        <div className="anecdote-list">{anecdote.content}</div>
        <div className="vote-count">
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = { votesToAnecdote, setNotification };

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;

// import React from "react";
// import "../style.css";
// import { votesToAnecdote } from "../reducers/anecdoteReducer";
// import { connect } from "react-redux";
// import { setNotification } from "../reducers/notificationReducer";

// const AnecdoteList = (props) => {
//   const anecdotes = () => {
//     if (props.filter.query) {
//       return props.anecdotes.filter((anecdote) =>
//         anecdote.content.includes(props.filter.query)
//       );
//     }
//     return props.anecdotes;
//   };

//   const vote = (anecdote) => {
//     // console.log("vote", anecdote);
//     props.votesToAnecdote(anecdote.id);
//     props.setNotification({ text: `You voted: ${anecdote.content}`, delay: 5 });
//   };

//   return (
//     <div className="layout">
//       <div className="anecdote-list">
//         {anecdotes
//           .sort((a, b) => b.votes - a.votes)
//           .map((anecdote) => (
//             <div key={anecdote.id}>
//               <div>{anecdote.content}</div>
//               <div className="vote-count">
//                 has {anecdote.votes}
//                 <button onClick={() => vote(anecdote)}>vote</button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     anecdotes: state.anecdotes,
//     filter: state.filter,
//   };
// };

// const mapDispatchToProps = { votesToAnecdote, setNotification };

// const ConnectedAnecdotes = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AnecdoteList);
// export default ConnectedAnecdotes;
