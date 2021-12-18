import { createStore, combineReducers } from "redux";
import reducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const combinedReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
});

export const store = createStore(combinedReducer, composeWithDevTools());
