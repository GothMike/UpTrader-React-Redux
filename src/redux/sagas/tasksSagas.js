import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import {
  taskFetching,
  taskFetched,
  taskFetchingError,
  tasksFetching,
  tasksFetched,
  tasksFetchingError,
  taskCreateSuccess,
  taskUpdatedSuccess,
  apiUrlTasks,
} from "../actions/taskActions";
import { disabledModalCreateSuccess, disabledModalUpdateSuccess } from "../actions/modalActions";

export function* fetchTasksSaga(action) {
  try {
    const response = yield call(() => axios.get(apiUrlTasks(`${action.payload}`)));
    yield put(tasksFetched(response.data));
  } catch (error) {
    yield put(tasksFetchingError());
  }
}

export function* fetchTaskSaga({ projectId, taskId }) {
  try {
    const response = yield call(() => axios.get(apiUrlTasks(projectId, taskId)));
    yield put(taskFetched(response.data));
  } catch (error) {
    yield put(taskFetchingError());
  }
}

export function* updatedTasksSaga({ projectId, taskId, newTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), newTask);
    yield put(tasksFetching(projectId));
    yield put(taskUpdatedSuccess());
    yield delay(2000);
    yield put(disabledModalUpdateSuccess());
  } catch (error) {
    console.log(`Ошибка при редактировании ${error}`);
  }
}

export function* createdSubtasksSaga({ projectId, taskId, newTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), newTask);
    yield put(taskFetching(projectId, taskId));
    yield;
  } catch (error) {
    console.log(`Ошибка при редактировании ${error}`);
  }
}

export function* deleteTaskSaga({ task }) {
  try {
    const { ProjectId, id } = task;
    yield call(() => axios.delete(apiUrlTasks(ProjectId, id)));
    yield put(tasksFetching(ProjectId));
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
}

export function* createTaskSaga(action) {
  try {
    yield call(() => axios.post(apiUrlTasks(action.projectId), action.payload));
    yield put(taskCreateSuccess());
    yield put(tasksFetching(action.projectId));
    yield delay(2000);
    yield put(disabledModalCreateSuccess());
  } catch (error) {
    console.error("Произошла ошибка при создании задачи:", error);
  }
}

export function* moveTasks({ projectId, taskId, newTask }) {
  try {
    yield axios.put(apiUrlTasks(projectId, taskId), newTask);
    yield put(tasksFetching(projectId));
  } catch (error) {
    console.log(`Ошибка при перемещении ${error}`);
  }
}
export function* watchTasksActions() {
  yield takeLatest("TASKS_FETCHING", fetchTasksSaga);
  yield takeLatest("TASK_FETCHING", fetchTaskSaga);
  yield takeLatest("TASK_UPDATED", updatedTasksSaga);
  yield takeLatest("TASK_CREATED", createTaskSaga);
  yield takeLatest("TASK_DELETED", deleteTaskSaga);
  yield takeLatest("MOVE_TASK", moveTasks);
  yield takeLatest("SUBTASK_CREATED", createdSubtasksSaga);
}
