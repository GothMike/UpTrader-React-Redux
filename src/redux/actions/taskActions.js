export const apiUrlTasks = (projectId, taskId = "") =>
  `https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects/${projectId}/Tasks/${taskId}`;

export const tasksFetching = (id) => {
  return {
    type: "TASKS_FETCHING",
    payload: id,
  };
};

export const tasksFetched = (tasks) => {
  return {
    type: "TASKS_FETCHED",
    payload: tasks,
  };
};

export const saveUpdatedTask = (projectId, taskId, newTask) => ({
  type: "SAVE_UPDATED_TASK",
  projectId,
  taskId,
  newTask,
});

export const updateTasks = (updatedTask) => ({
  type: "UPDATE_TASK",
  payload: updatedTask,
});

export const tasksFetchingError = () => {
  return {
    type: "TASKS_FETCHING_ERROR",
  };
};

export const taskCreated = (task, projectId) => {
  return {
    type: "TASK_CREATED",
    payload: task,
    projectId,
  };
};

export const taskCreateSuccess = () => {
  return {
    type: "TASK_CREATE_SUCCESS",
  };
};

export const taskUpdated = (task) => {
  return {
    type: "TASK_UPDATED",
    payload: task,
  };
};

export const taskUpdatedSuccess = (isActive) => {
  return {
    type: "TASK_UPDATED_SUCCESS",
    payload: !isActive,
  };
};

export const taskDeleted = (id) => {
  return {
    type: "TASK_DELETED",
    payload: id,
  };
};

export const toogleModal = (isActive) => {
  return {
    type: "TOOGLE_MODAL",
    payload: !isActive,
  };
};

export const disabledModalCreateSuccess = (isActive) => {
  return {
    type: "DISABLED_CREATE_MODAL_SUCCESS",
    payload: !isActive,
  };
};

export const disabledModalUpdateSuccess = (isActive) => {
  return {
    type: "DISABLED_UPDATE_MODAL_SUCCESS",
    payload: !isActive,
  };
};

export const searchEnteredData = (query) => {
  return {
    type: "UPDATE_SEARCH_QUERY",
    payload: query,
  };
};
