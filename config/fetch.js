import axios from "axios";

const BASE_URL = "https://backend-recipe-app.vercel.app";

const fetch = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchWithToken = (token) => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

const fetchForm = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export {BASE_URL, fetchWithToken, fetchForm}

export default fetch;
