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
