import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { getToken, removeToken } from "@/lib/token-storage";

// TEMP: dummyjson for testing.
//const API_URL = "https://dummyjson.com";

const API_URL = "https://hr-staffflow-backend.onrender.com";

//API IMPLEMENTATION USING AXIOS METHOD
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  //headers: {},
});

// ORIGINAL -- Attach the saved token to every request automatically
// apiClient.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

//Web compatible -- Attach the saved token to every request automatically
apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ORIGINAL -- Attach the saved token to every request automatically
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await SecureStore.deleteItemAsync("authToken"); // remove dead token
//       router.replace("/login"); // send user to login
//     }
//     return Promise.reject(error);
//   },
// );

//Web compatible -- Attach the saved token to every request automatically
let handling401 = false; // stops several parallel 401s from redirecting twice

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // A wrong password on login is a normal error, not an expired session
    const isLoginCall = error.config?.url?.includes("/users/login");

    if (error.response?.status === 401 && !isLoginCall && !handling401) {
      handling401 = true;
      try {
        await removeToken(); // drop the dead token
        router.replace("/login"); // send the user back to the login screen
      } finally {
        handling401 = false;
      }
    }
    return Promise.reject(error); // callers still get the error
  },
);

export default function APIClient() {
  const getMethod = async (endpoint: string) => {
    const response = await apiClient.get(endpoint);
    const data = await response.data;
    return data;
  };

  // const postMethod = async (endpoint: string, payload: any) => {
  //   try {
  //     const response = await apiClient.post(endpoint, payload);
  //     const data = await response.data;
  //     return data;
  //   } catch (error) {
  //     console.error("Error in POST request:", error);
  //   } finally {
  //   }
  // };

  const postMethod = async (endpoint: string, payload: any) => {
    const response = await apiClient.post(endpoint, payload);
    const data = await response.data;
    return data;
  };
  return { getMethod, postMethod };
}

//STANDALONE API IMPLEMENTATION USING AXIOS METHOD - NOT FUNCTIONAL
const getMethod = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  //const status = response.status;
  const data = await response.data;
  return data;
};

//STANDALONE API IMPLEMENTATION USING AXIOS METHOD - NOT FUNCTIONAL
const postMethod = async (endpoint: string, payload: any) => {
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
