const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const commentsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LIST_COMMENT":
      return { ...state, data: payload, isLoading: false };

    case "LIST_COMMENT_LOADING":
      return { ...state, isLoading: true };

    case "LIST_COMMENT_FAILED":
      return { ...state, isLoading: false, isError: payload };

    default:
      return state;
  }
};

export default commentsReducer;
