import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { taskFetching, apiUrlTasks } from "../actions/taskActions";

export function* createSubtaskSaga({ projectId, taskId, newTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), newTask);
    yield put(taskFetching(projectId, taskId));
    yield;
  } catch (error) {
    console.log(`Ошибка при создании ${error}`);
  }
}

export function* updateSubtasksSaga({ projectId, taskId, updateTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), updateTask);
    yield put(taskFetching(projectId, taskId));
  } catch (error) {
    console.log(`Ошибка при редактировании ${error}`);
  }
}

export function* deleteSubtaskSaga({ projectId, taskId, updateTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), updateTask);
    yield put(taskFetching(projectId, taskId));
  } catch (error) {
    console.log(`Ошибка при редактировании ${error}`);
  }
}

export function* watchSubtasksActions() {
  yield takeLatest("SUBTASK_CREATE", createSubtaskSaga);
  yield takeLatest("SUBTASK_UPDATE", updateSubtasksSaga);
  yield takeLatest("SUBTASK_DELETE", deleteSubtaskSaga);
}
