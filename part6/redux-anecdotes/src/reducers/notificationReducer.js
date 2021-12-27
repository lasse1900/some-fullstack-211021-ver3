export const setNotification = (props) => {
  const { text, delay } = props;
  // console.log("--->", text, delay);
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        text,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
        data: '',
      });
    }, delay * 1000);
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
