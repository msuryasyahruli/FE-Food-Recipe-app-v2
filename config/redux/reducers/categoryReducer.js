const initialState = {
  data: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_CATEGORIES_LOADING":
      return { ...state, loading: true };

    case "GET_CATEGORIES":
      return { ...state, data: payload, loading: false };

    case "GET_CATEGORIES_FAILED":
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default categoryReducer;
