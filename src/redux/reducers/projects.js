const initialState = {
  projects: [],
  projectLoadingStatus: "idle",
  modalCreateActive: false,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case "PROJECTS_FETCHING":
      return {
        ...state,
        projectLoadingStatus: "loading",
      };
    case "PROJECTS_FETCHED":
      return {
        ...state,
        projects: action.payload,
        projectLoadingStatus: "idle",
      };
    case "PROJECTS_FETCHING_ERROR":
      return {
        ...state,
        projectLoadingStatus: "error",
      };
    case "PROJECT_CREATED":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "PROJECT_DELETED":
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.payload),
        modalCreateActive: false,
      };
    case "TOOGLE_MODAL":
      return {
        ...state,
        modalCreateActive: action.payload,
      };

    default:
      return state;
  }
};

export default projects;
