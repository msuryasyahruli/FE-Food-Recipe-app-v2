const initialState = {
  listRecipes: {
    isLoading: false,
    isLoadingMore: false,
    isError: false,
    data: [],
    pagination: {},
  },
  detailRecipe: {
    isLoading: false,
    isError: false,
    data: [],
  },
  userRecipes: {
    isLoading: false,
    isError: false,
    data: [],
  },
};

const recipesReducer = (state = initialState, action) => {
  const { meta, type, payload } = action;
  switch (type) {
    case "LIST_RECIPE": {
      return {
        ...state,
        listRecipes: {
          ...state.listRecipes,
          data: payload,
          pagination: meta,
          isLoading: false,
          isLoadingMore: false,
        },
      };
    }

    case "LIST_RECIPE_LOADING": {
      return {
        ...state,
        listRecipes: {
          ...state.listRecipes,
          isLoading: true,
        },
      };
    }

    case "LIST_RECIPE_FAILED": {
      return {
        ...state,
        listRecipes: {
          ...state.listRecipes,
          isLoading: false,
          isError: payload,
        },
      };
    }

    case "DETAIL_RECIPE": {
      return {
        ...state,
        detailRecipe: {
          ...state.detailRecipe,
          data: payload,
          isLoading: false,
        },
      };
    }

    case "DETAIL_RECIPE_LOADING": {
      return {
        ...state,
        detailRecipe: {
          ...state.detailRecipe,
          isLoading: true,
          data: []
        },
      };
    }

    case "DETAIL_RECIPE_FAILED": {
      return {
        ...state,
        detailRecipe: {
          ...state.detailRecipe,
          isLoading: false,
          isError: payload,
        },
      };
    }
    
    case "LIST_USER_RECIPE": {
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          data: payload,
          isLoading: false,
        },
      };
    }

    case "LIST_USER_RECIPE_LOADING": {
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isLoading: true,
          data: []
        },
      };
    }

    case "LIST_USER_RECIPE_FAILED": {
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isLoading: false,
          isError: payload,
        },
      };
    }

    default:
      return state;
  }
};

export default recipesReducer;
