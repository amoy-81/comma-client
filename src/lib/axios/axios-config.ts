import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    console.log(session);
    if (session?.user.token) {
      config.headers.Authorization = `Bearer ${session?.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try refreshing the token
      try {
        const session = await getSession();
        const response = await axios.get("/auth/refresh-token", {
          headers: { r_t: session?.user.refreshToken },
        });

        const { token, refreshToken: newRefreshToken } = response.data;
        // TODO : update session

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token is also expired, redirect to login
        await signOut();
        redirect("/auth/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
