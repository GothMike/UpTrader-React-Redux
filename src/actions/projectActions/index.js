import axios from "axios";
const apiUrl = "https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects";

export const fetchProjects = () => async (dispatch) => {
  dispatch(projectsFetching());
  axios
    .get(apiUrl)
    .then((response) => dispatch(projectsFetched(response.data)))
    .catch(() => dispatch(projectsFetchingError()));
};

export const projectsFetching = () => {
  return {
    type: "PROJECTS_FETCHING",
  };
};

export const projectsFetched = (projects) => {
  return {
    type: "PROJECTS_FETCHED",
    payload: projects,
  };
};

export const projectsFetchingError = () => {
  return {
    type: "PROJECTS_FETCHING_ERROR",
  };
};

export const projectCreated = (project) => {
  return {
    type: "PROJECT_CREATED",
    payload: project,
  };
};
