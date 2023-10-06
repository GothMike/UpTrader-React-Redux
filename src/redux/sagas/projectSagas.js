import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import {
  projectsFetched,
  projectsFetchingError,
  projectCreateSuccess,
  disabledModalCreateSuccess,
  apiUrl,
} from "../actions/projectActions";

export function* fetchProjectsSaga() {
  try {
    const response = yield call(() => axios.get(apiUrl("Projects")));
    yield put(projectsFetched(response.data));
  } catch (error) {
    yield put(projectsFetchingError());
  }
}

export function* deleteProjectSaga(action) {
  try {
    yield call(() => axios.delete(apiUrl(`Projects/${action.payload}`)));
  } catch (error) {
    console.error("Ошибка при удалении проекта:", error);
  }
}

export function* createProjectSaga(action) {
  try {
    yield call(() => axios.post(apiUrl("Projects"), action.payload));
    yield put(projectCreateSuccess());
    yield delay(2000);
    yield put(disabledModalCreateSuccess());
  } catch (error) {
    console.error("Произошла ошибка при создании проекта:", error);
  }
}

export function* watchProjectActions() {
  yield takeLatest("PROJECTS_FETCHING", fetchProjectsSaga);
  yield takeLatest("PROJECT_DELETED", deleteProjectSaga);
  yield takeLatest("PROJECT_CREATED", createProjectSaga);
}
