import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const combinedReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
