import axios from "axios";
import { store } from "../../redux/store";
import { showLoading, hideLoading } from "../../redux/slices/loadingSlice";
import { clearToken } from "../../redux/slices/authSlice";
import { showToast } from "../../redux/slices/toastSlice";

const BASE_URL = "http://localhost:5173/api/";
const TIMEOUT = 60000;

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = TIMEOUT;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method?.toLowerCase() === "get") {
    store.dispatch(showLoading());
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoading());
    // موفقیت: Toast
    if (
      ["post", "put", "patch", "delete"].includes(
        response.config.method.toLowerCase()
      )
    ) {
      store.dispatch(
        showToast({
          message:
            response.data?.message ||
            response.data?.data?.message ||
            "درخواست موفق بود",
          type: "success",
        })
      );
    }
    return response;
  },
  (error) => {
    store.dispatch(hideLoading());

    if ([401, 403].includes(error?.response?.status)) {
      store.dispatch(clearToken());
      localStorage.removeItem("token");
    }

    store.dispatch(
      showToast({
        message:
          error?.response?.data?.data?.email?.[0] ||
          error?.response?.data?.data?.phone?.[0] ||
          error?.response?.data?.data?.password?.[0] ||
          error?.response?.data?.message ||
          "خطایی رخ داد، لطفا دوباره تلاش کنید",
        type: "error",
      })
    );

    return Promise.reject(error);
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params }),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  patch: (url, body) => axios.patch(url, body),
  delete: (url, body) => axios.delete(url, { data: body }),
};

export default requests;
