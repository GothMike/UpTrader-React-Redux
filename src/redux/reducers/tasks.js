const initialState = {
  tasks: [],
  projectId: "",
  dataEntry: "",
  tasksLoadingStatus: "idle",
  modalCreateActive: false,
  modalCreateSuccess: false,
  modalUpdateSuccess: false,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "TASKS_FETCHING":
      return {
        ...state,
        tasksLoadingStatus: "loading",
        projectId: action.payload,
      };
    case "TASKS_FETCHED":
      return {
        ...state,
        tasks: action.payload,
        tasksLoadingStatus: "idle",
      };
    case "TASKS_FETCHING_ERROR":
      return {
        ...state,
        tasksLoadingStatus: "error",
      };
    case "TASKS_UPDATE":
      return {
        ...state,
        task: action.payload,
      };
    case "TASK_CREATED":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "TASK_CREATE_SUCCESS":
      return {
        ...state,
        modalCreateActive: false,
        modalCreateSuccess: true,
      };
    case "TASK_UPDATED": {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload,
          };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "TASK_UPDATED_SUCCESS": {
      return {
        ...state,
        modalUpdateSuccess: true,
      };
    }
    case "TASK_DELETED":
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };
    case "TOOGLE_MODAL":
      return {
        ...state,
        modalCreateActive: action.payload,
      };
    case "DISABLED_CREATE_MODAL_SUCCESS":
      return {
        ...state,
        modalCreateSuccess: !action.payload,
      };
    case "DISABLED_UPDATE_MODAL_SUCCESS":
      return {
        ...state,
        modalUpdateSuccess: !action.payload,
      };
    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        dataEntry: action.payload,
      };

    default:
      return state;
  }
};

export default tasks;
