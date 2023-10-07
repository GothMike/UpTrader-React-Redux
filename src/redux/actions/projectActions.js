export const apiUrl = (Data) => `https://651b2642194f77f2a5ae49fd.mockapi.io/api/${Data}`;

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

export const projectCreateSuccess = () => {
  return {
    type: "PROJECT_CREATE_SUCCESS",
  };
};

export const projectUpdated = (project) => {
  return {
    type: "PROJECT_UPDATED",
    payload: project,
  };
};

export const projectUpdatedSuccess = (isActive) => {
  return {
    type: "PROJECT_UPDATED_SUCCESS",
    payload: !isActive,
  };
};

export const projectDeleted = (id) => {
  return {
    type: "PROJECT_DELETED",
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
