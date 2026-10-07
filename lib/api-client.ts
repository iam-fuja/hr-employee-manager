import axios from "axios";

// TEMP: dummyjson for testing.
const API_URL = "https://dummyjson.com";

//const API_URL = "https://hr-staffflow-backend.onrender.com";

//API IMPLEMENTATION USING AXIOS METHOD
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getMethod = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  //const status = response.status;
  const data = await response.data;
  return data;
};

export const postMethod = async (endpoint: string, payload: any) => {
  const response = await apiClient.post(endpoint, payload);
  const status = response.status;
  const data = await response.data;
  return { status, data };
};

//API IMPLEMENTATION USING FETCH-API METHOD
// export const getMethod = async (endpoint: string) => {
//   const response = await fetch(`${API_URL}/${endpoint}`);
//   const data = await response.json();
//   return data;
// };
