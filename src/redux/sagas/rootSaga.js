import { all } from "redux-saga/effects";
import { watchProjectActions } from "./projectSagas";

export default function* rootSaga() {
  yield all([watchProjectActions()]);
}
