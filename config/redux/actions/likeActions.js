import ShowToast from "../../toast";
import fetch, { BASE_URL } from "../../fetch";

// GET DATA
export const fetchLike = (id) => async (dispatch) => {
  dispatch({ type: "GET_LIKES_LOADING" });
  const url = BASE_URL + `/likeds/${id}`;
  try {
    const { data } = await fetch.get(url);
    dispatch({
      type: "GET_LIKES",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch({ type: "GET_LIKES_FAILED", payload: error });
  }
};

// POST DATA
export const likeRecipe = async (payload) => {
  const url = BASE_URL + "/likeds";
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      ShowToast("Recipe Liked");
    } else {
      ShowToast(data.message || "Recipe Already Liked");
    }
  } catch (error) {
    ShowToast(error.message || "Error");
    throw error;
  }
};

// DELETE DATA
export const unLikeRecipe = async (id) => {
  const url = BASE_URL + `/likeds/${id}`;
  try {
    const { data } = await fetch.delete(url);
    if (data.statusCode === 200) {
      ShowToast("Recipe Unliked");
    }
  } catch (error) {
    ShowToast(error.message || "Error");
    throw error;
  }
};
