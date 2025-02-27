const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER":
      return { ...state, data: payload, isLoading: false };

    case "GET_USER_LOADING":
      return { ...state, isLoading: true };

    case "GET_USER_FAILED":
      return { ...state, isLoading: false, data: payload, isError: true };

    default:
      return state;
  }
};

export default userReducer;
