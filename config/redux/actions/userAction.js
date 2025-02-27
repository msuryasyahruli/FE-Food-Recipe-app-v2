import createFetchInstance , { BASE_URL } from "../../fetch";
import ShowToast from "../../toast";

// GET USER
export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_LOADING" });
    const url = BASE_URL + `/users/profile`;
    try {
      const fetch = await createFetchInstance();
      const { data } = await fetch.get(url);
      dispatch({ type: "GET_USER", payload: data.data });
    } catch (error) {
      dispatch({ type: "GET_USER_FAILED", payload: error });
    }
  };
};

// LOGIN
export const login = async (payload) => {
  const url = BASE_URL + "/users/login";
  try {
    const fetch = await createFetchInstance();
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

// REGISTER
export const register = async (payload) => {
  const url = BASE_URL + "/users/register";
  try {
    const fetch = await createFetchInstance();
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

// UPDATE PASSWORD
export const updatePassword = async (id, payload) => {
  const url = BASE_URL + `/users/${id}/password`;
  try {
    const fetch = await createFetchInstance();
    const { data } = await fetch.put(url, payload);
    if (data.statusCode === 200) {
      ShowToast(data.message || "Reset Successful");
    } else {
      ShowToast(data);
    }
    return data;
  } catch (error) {
    ShowToast(error);
    throw error;
  }
};
