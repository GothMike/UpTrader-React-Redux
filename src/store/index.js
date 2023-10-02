import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import projects from "../reducers/projects";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const rootReducer = combineReducers({
  projects: projects,
  // Другие редьюсеры, если есть
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
