import axios from "axios";
export const apiUrl = (Data) => `https://651b2642194f77f2a5ae49fd.mockapi.io/api/${Data}`;

export const fetchProjects = () => async (dispatch) => {
  dispatch(projectsFetching());
  axios
    .get(apiUrl(`Projects`))
    .then((response) => dispatch(projectsFetched(response.data)))
    .catch(() => dispatch(projectsFetchingError()));
};

export const createProject = (newProject, dispatch) => {
  axios
    .post(apiUrl(`Projects`), newProject)
    .then((response) => dispatch(projectCreated(response.data)))
    .then((response) => dispatch(toogleModal(response)))
    .catch((e) => {
      console.error("Произошла ошибка при создании объекта:", e);
    });
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

export const toogleModal = (isActive) => {
  return {
    type: "TOOGLE_MODAL",
    payload: !isActive,
  };
};
