import fetch, { BASE_URL, fetchWithToken } from "../../fetch";
import ShowToast from "../../toast";

// GET USER
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_LOADING" });
    const url = BASE_URL + `/users/profile`;

    try {
      const { data } = await fetchWithToken(token).get(url);
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
    const { data } = await fetch.post(url, payload);
    ShowToast(data.message || "Login Successful")
    return data;
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};

// REGISTER
export const register = async (payload) => {
  const url = BASE_URL + "/users/register";
  try {
    const { data } = await fetch.post(url, payload);
    ShowToast(data.message || data || "Registration Successful");
    return data;
  } catch (error) {
    ShowToast(error.message);
    throw error;
  }
};
