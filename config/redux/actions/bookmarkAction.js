import ShowToast from "../../toast";
import fetch, { BASE_URL } from "../../fetch";

// GET DATA
export const fetchBookmark = (id) => async (dispatch) => {
  dispatch({ type: "GET_BOOKMARK_LOADING" });
  const url = BASE_URL + `/bookmarks/${id}`;
  try {
    const { data } = await fetch.get(url);
    dispatch({
      type: "GET_BOOKMARK",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch({ type: "GET_BOOKMARK_FAILED", payload: error });
  }
};

// POST DATA
export const savedRecipe = async (payload) => {
  const url = BASE_URL + "/bookmarks";
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      ShowToast("Recipe Saved");
    } else {
      ShowToast(data.message || "Recipe Already Saved");
    }
  } catch (error) {
    ShowToast(error.message || "Error");
    throw error;
  }
};

// DELETE DATA
export const unSavedRecipe = async (id) => {
  const url = BASE_URL + `/bookmarks/${id}`;
  try {
    const { data } = await fetch.delete(url);
    if (data.statusCode === 200) {
      ShowToast("Recipe Unsaved");
    }
  } catch (error) {
    ShowToast(error.message || "Error");
    throw error;
  }
};
