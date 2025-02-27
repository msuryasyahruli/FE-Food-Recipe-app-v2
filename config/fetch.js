import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://backend-recipe-app.vercel.app";

const createFetchInstance  = async (isFormData = false) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({ headers });
};

export {BASE_URL}

export default createFetchInstance ;
