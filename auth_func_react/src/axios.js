import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },

  async (err) => {
    const originalRequest = err.config;
    console.log(err.response);
    if (err.response.data.message === "refreshToken 만료") {
      return Promise.reject(err);
    } else if (err.response.status === 401) {
      const refreshToken = cookies.get("refreshToken");
      if (!refreshToken) {
        console.log("refreshToken 없음");
        return Promise.reject(err);
      }
    }

    await instance
      .get("auth/refresh")
      .then((res) => {
        const accessToken = res.data.accessToken;
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        cookies.set("accessToken", accessToken);
        return instance(originalRequest);
      })
      .catch((err) => {
        cookies.remove("refreshToken");
        return Promise.reject(err);
      });
  }
);

instance.defaults.withCredentials = true;
instance.defaults.headers.common["Authorization"] = `Bearer ${cookies.get("accessToken")}`;
