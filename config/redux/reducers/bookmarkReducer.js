const initialState = {
    data: [],
    isLoading: false,
    error: null,
  };
  
  const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_BOOKMARK":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
  
      case "GET_BOOKMARK_LOADING":
        return {
          ...state,
          isLoading: true,
        };
  
      case "GET_BOOKMARK_FAILED":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default bookmarkReducer;
  