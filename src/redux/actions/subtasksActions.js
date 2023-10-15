export const subtaskCreated = (projectId, taskId, newTask) => ({
  type: "SUBTASK_CREATED",
  projectId,
  taskId,
  newTask,
});
