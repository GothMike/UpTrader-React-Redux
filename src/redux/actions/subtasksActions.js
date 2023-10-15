export const subtaskCreate = (projectId, taskId, newTask) => ({
  type: "SUBTASK_CREATE",
  projectId,
  taskId,
  newTask,
});

export const subtaskUpdate = (projectId, taskId, updateTask) => ({
  type: "SUBTASK_UPDATE",
  projectId,
  taskId,
  updateTask,
});

export const subtaskDelete = (projectId, taskId, updateTask) => ({
  type: "SUBTASK_DELETE",
  projectId,
  taskId,
  updateTask,
});
