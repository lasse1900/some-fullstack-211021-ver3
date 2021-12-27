export const setNotification = (text) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        text,
      },
    });
  };
};


export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const notificationReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { text: action.data.text };
    case "CLEAR_NOTIFICATION":
      return { text: "", timer: null };
    default:
      return state;
  }
};

export default notificationReducer;
