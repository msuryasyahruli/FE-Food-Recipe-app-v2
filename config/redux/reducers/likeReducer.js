const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIKES":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case "GET_LIKES_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_LIKES_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default likeReducer;
