import ShowToast from "../../toast";
import createFetchInstance, { BASE_URL } from "../../fetch";

const setErrorListRecipe = (error = "") => ({
  type: "LIST_RECIPE_FAILED",
  payload: error,
});

const setErrorListUserRecipe = (error = "") => ({
  type: "LIST_USER_RECIPE_FAILED",
  payload: error,
});

const setErrorDetailRecipe = (error = "") => ({
  type: "DETAIL_RECIPE_FAILED",
  payload: error,
});

// LIST RECIPES
export const fetchListRecipe = (params) => async (dispatch) => {
  dispatch({ type: "LIST_RECIPE_LOADING" });
  const url = BASE_URL + `/recipes`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.get(url, { params });
    dispatch({
      type: "LIST_RECIPE",
      payload: data.data,
      meta: data.pagination,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch(setErrorListRecipe(error));
  }
};

// LIST USER RECIPES
export const fetchListUserRecipe = (id) => async (dispatch) => {
  dispatch({ type: "LIST_USER_RECIPE_LOADING" });
  const url = BASE_URL + `/recipes/${id}/user`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.get(url);
    dispatch({
      type: "LIST_USER_RECIPE",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch(setErrorListUserRecipe(error));
  }
};

// DETAIL RECIPE
export const fetchDetailRecipe = (id) => async (dispatch) => {
  dispatch({ type: "DETAIL_RECIPE_LOADING" });
  const url = BASE_URL + `/recipes/${id}`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.get(url);
    dispatch({
      type: "DETAIL_RECIPE",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch(setErrorDetailRecipe(error));
  }
};

// POST RECIPE
export const postRecipe = async (payload) => {
  const url = BASE_URL + "/recipes";
  try {
    const fetch = await createFetchInstance(true);
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      ShowToast(data.message);
      return data;
    } else {
      ShowToast(data.message);
    }
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};

// UPDATE RECIPE
export const updateRecipe = async (id, payload) => {
  const url = BASE_URL + `/recipes/${id}`;
  try {
    const fetch = await createFetchInstance(true);
    const { data } = await fetch.patch(url, payload);
    if (data.statusCode === 200) {
      ShowToast("Update Recipe Successfully");
      return data;
    } else {
      ShowToast(data.message);
    }
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};

// DELETE RECIPE
export const deleteRecipe = async (id) => {
  const url = BASE_URL + `/recipes/${id}`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.delete(url);
    if (data.statusCode === 200) {
      ShowToast("Recipe Deleted");
    }
  } catch (error) {
    ShowToast(error.message || "Error");
    throw error;
  }
};
