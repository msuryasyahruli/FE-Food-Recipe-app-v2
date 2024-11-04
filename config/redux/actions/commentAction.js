import ShowToast from "../../toast";
import fetch, { BASE_URL } from "../../fetch";

const setErrorListComment = (error = "") => ({
  type: "LIST_COMMENT_FAILED",
  payload: error,
});

// GET DATA
export const fetchListComment = (id) => async (dispatch) => {
  dispatch({ type: "LIST_COMMENT_LOADING" });
  const url = BASE_URL + `/comments/${id}`;
  try {
    const { data } = await fetch.get(url);
    dispatch({
      type: "LIST_COMMENT",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch(setErrorListComment(error));
  }
};

// POST DATA
export const postComment = async (payload) => {
  const url = BASE_URL + "/comments";
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      ShowToast(data.message || "Comment Added");
    }
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};
