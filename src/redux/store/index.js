import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import projects from "../reducers/projects";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga"; // Импортируйте корневую сагу

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  projects: projects,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export default store;
