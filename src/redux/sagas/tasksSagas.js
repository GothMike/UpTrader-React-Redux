import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import {
  tasksFetching,
  tasksFetched,
  tasksFetchingError,
  taskCreateSuccess,
  disabledModalCreateSuccess,
  projectUpdatedSuccess,
  disabledModalUpdateSuccess,
  updateTasks,
  apiUrlTasks,
} from "../actions/taskActions";

export function* fetchTasksSaga(action) {
  try {
    const response = yield call(() => axios.get(apiUrlTasks(`${action.payload}`)));
    yield put(tasksFetched(response.data));
  } catch (error) {
    yield put(tasksFetchingError());
  }
}

export function* saveUpdatedTasksSaga({ projectId, taskId, newTask }) {
  console.log(projectId);
  console.log(taskId);
  console.log(newTask);

  try {
    yield axios.put(
      `https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects/${projectId}/Tasks/${taskId}`,
      newTask
    );
    yield console.log("success");
  } catch (error) {
    console.log(`Ошибка при редактировании ${error}`);
  }
}

// export function* deleteProjectSaga(action) {
//   try {
//     yield call(() => axios.delete(apiUrl(`Projects/${action.payload}`)));
//   } catch (error) {
//     console.error("Ошибка при удалении проекта:", error);
//   }
// }

// export function* createProjectSaga(action) {
//   try {
//     yield call(() => axios.post(apiUrl("Projects"), action.payload));
//     yield put(projectCreateSuccess());
//     yield put(projectsFetching());
//     yield delay(2000);
//     yield put(disabledModalCreateSuccess());
//   } catch (error) {
//     console.error("Произошла ошибка при создании проекта:", error);
//   }
// }

// export function* updateProjectSaga(action) {
//   try {
//     yield call(() => axios.put(apiUrl(`Projects/${action.payload.id}`), action.payload));
//     yield put(projectUpdatedSuccess());
//     yield delay(2000);
//     yield put(disabledModalUpdateSuccess());
//   } catch (error) {
//     console.error("Произошла ошибка при обновлении проекта:", error);
//   }
// }

export function* watchTasksActions() {
  yield takeLatest("TASKS_FETCHING", fetchTasksSaga);
  yield takeLatest("SAVE_UPDATED_TASK", saveUpdatedTasksSaga);

  //   yield takeLatest("PROJECT_DELETED", deleteProjectSaga);
  //   yield takeLatest("PROJECT_CREATED", createProjectSaga);
  //   yield takeLatest("PROJECT_UPDATED", updateProjectSaga);
}
