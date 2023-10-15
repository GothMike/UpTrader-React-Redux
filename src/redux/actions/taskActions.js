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

export const tasksFetchingError = () => {
  return {
    type: "TASKS_FETCHING_ERROR",
  };
};

export const taskFetching = (projectId, taskId) => {
  return {
    type: "TASK_FETCHING",
    projectId,
    taskId,
  };
};

export const taskFetched = (task) => {
  return {
    type: "TASK_FETCHED",
    payload: task,
  };
};

export const taskFetchingError = () => {
  return {
    type: "TASK_FETCHING_ERROR",
  };
};

export const moveTasks = (projectId, taskId, newTask) => ({
  type: "MOVE_TASK",
  projectId,
  taskId,
  newTask,
});

export const taskUpdated = (projectId, taskId, newTask) => ({
  type: "TASK_UPDATED",
  projectId,
  taskId,
  newTask,
});

export const taskCreated = (task, projectId) => {
  return {
    type: "TASK_CREATED",
    payload: task,
    projectId,
  };
};
export const taskDeleted = (task) => {
  return {
    type: "TASK_DELETED",
    task,
  };
};

export const taskCreateSuccess = () => {
  return {
    type: "TASK_CREATE_SUCCESS",
  };
};

export const taskUpdatedSuccess = (isActive) => {
  return {
    type: "TASK_UPDATED_SUCCESS",
    payload: !isActive,
  };
};

export const chooseTask = (task) => {
  return {
    type: "CHOOSE_TASK",
    payload: task,
  };
};
