const initialState = {
  projects: [],
  dataEntry: "",
  projectLoadingStatus: "idle",
  modalCreateActive: false,
  modalCreateSuccess: false,
  modalUpdateSuccess: false,
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
    case "PROJECT_CREATE_SUCCESS":
      return {
        ...state,
        modalCreateActive: false,
        modalCreateSuccess: true,
      };
    case "PROJECT_UPDATED": {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          return {
            ...project,
            ...action.payload,
          };
        }
        return project;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    }
    case "PROJECT_UPDATED_SUCCESS": {
      return {
        ...state,
        modalUpdateSuccess: true,
      };
    }
    case "PROJECT_DELETED":
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.payload),
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

export default projects;
