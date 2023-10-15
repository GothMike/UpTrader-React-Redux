import { all } from "redux-saga/effects";
import { watchProjectActions } from "./projectSagas";
import { watchTasksActions } from "./tasksSagas";
import { watchSubtasksActions } from "./subtasksSagas";

export default function* rootSaga() {
  yield all([watchProjectActions(), watchTasksActions(), watchSubtasksActions()]);
}
