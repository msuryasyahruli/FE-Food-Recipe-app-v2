import ShowToast from "../../toast";
import createFetchInstance, { BASE_URL } from "../../fetch";

// GET DATA
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: "GET_CATEGORIES_LOADING" });
  const url = BASE_URL + `/categories`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.get(url);
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.data,
    });
  } catch (error) {
    ShowToast(error.message);
    dispatch({ type: "GET_CATEGORIES_FAILED", payload: error });
  }
};
