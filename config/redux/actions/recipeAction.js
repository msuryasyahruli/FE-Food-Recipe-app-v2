import { ShowToast } from "../../toast";
import fetch, { BASE_URL, fetchForm } from "../../fetch";

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
    const { data } = await fetchForm.post(url, payload);
    if (data.statusCode === 201) {
      ShowToast(data.message || "Recipe Successfully Added");
      return data;
    }
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};
