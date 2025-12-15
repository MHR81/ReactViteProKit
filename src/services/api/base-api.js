import axios from "axios";
import { store } from "../../redux/store";
import { showLoading, hideLoading } from "../../redux/slices/loadingSlice";
import { clearToken } from "../../redux/slices/authSlice";
import { showToast } from "../../redux/slices/toastSlice";
import { ToastIgnore } from "./ToastIgnore";

const BASE_URL = "https://localhost:5173/api";
const TIMEOUT = 600000;

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = TIMEOUT;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") || null}`;

// =======================
// Helpers
// =======================
const isMutatingMethod = (method) => {
  return method && ["post", "put", "delete", "patch"].includes(method.toLowerCase());
};

const extractMessage = (obj) => {
  return (
    obj?.response?.data?.data?.message ||
    obj?.data?.data?.message ||
    obj?.message ||
    obj?.data?.message ||
    obj?.response?.data?.message ||
    obj?.response?.message ||
    "خطایی رخ داده است!"
  );
};

const getErrorMessageByStatus = (status, data) => {
  switch (status) {
    case 400: return data?.message || "درخواست نامعتبر است";
    case 401: return "نشست شما منقضی شده، مجدد وارد شوید";
    case 403: return "دسترسی شما محدود شده است";
    case 404: return "صفحه یا اطلاعات درخواستی یافت نشد";
    case 422: return data?.message || "اطلاعات ارسالی نامعتبر است";
    case 429: return "تعداد درخواست‌ها زیاد است، کمی صبر کنید";
    case 500: return "خطای داخلی سرور، لطفاً بعداً تلاش کنید";
    case 502:
    case 503: return "سرور در حال حاضر در دسترس نیست";
    case 504: return "سرور پاسخ نداد، دوباره تلاش کنید";
    default: return data?.message || `خطای غیرمنتظره (کد: ${status})`;
  }
};

// =======================
// Request Interceptors
// =======================
axios.interceptors.request.use(
  (config) => {
    if (config.method?.toLowerCase() === "get") {
      store.dispatch(showLoading());
    }
    return config;
  },
  (error) => {
    store.dispatch(hideLoading());
    return Promise.reject(error);
  }
);

// =======================
// Response Handlers
// =======================
const responseBody = (response) => {
  try {
    const method = response?.config?.method;
    if (!ToastIgnore.includes(response?.config?.url) && isMutatingMethod(method)) {
      const message = extractMessage(response) || "عملیات با موفقیت انجام شد";
      store.dispatch(showToast({ type: "success", message }));
    }
  } catch (e) {
    console.error("toast responseBody error:", e);
  } finally {
    store.dispatch(hideLoading());
  }
  return response;
};

const errorBody = (error) => {
  store.dispatch(hideLoading());

  // ===== خطاهای شبکه یا timeout =====
  if (!error.response) {
    if (error.code === "NETWORK_ERR" || error.message.includes("Network Error")) {
      store.dispatch(showToast({ message: "لطفا اتصال اینترنت خود را بررسی کنید", type: "error" }));
    } else if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      store.dispatch(showToast({ message: "مهلت زمانی درخواست تمام شد، دوباره تلاش کنید", type: "error" }));
    } else {
      store.dispatch(showToast({ message: "خطا در برقراری ارتباط با سرور", type: "error" }));
    }
    throw error;
  }

  // ===== خطاهای HTTP =====
  const { status, data } = error.response;
  const url = error?.config?.url || error?.response?.config?.url;

  if (!ToastIgnore.includes(url)) {
    const message = getErrorMessageByStatus(status, data);
    store.dispatch(showToast({ type: "error", message }));
  }

  // ===== مدیریت Token =====
  if ([401, 403].includes(status)) {
    store.dispatch(clearToken());
    window.location.href = "/login";
  }

  throw error?.response || error;
};

// =======================
// Axios Response Interceptor
// =======================
axios.interceptors.response.use(responseBody, errorBody);

// =======================
// Request Wrappers
// =======================
const requests = {
  get: (url) => axios.get(url).then(responseBody).catch(errorBody),
  getByParams: (url, params) => axios.get(url, { params }).then(responseBody).catch(errorBody),
  post: (url, body) => axios.post(url, body).then(responseBody).catch(errorBody),
  put: (url, body) => axios.put(url, body).then(responseBody).catch(errorBody),
  patch: (url, body) => axios.patch(url, body).then(responseBody).catch(errorBody),
  delete: (url) => axios.delete(url).then(responseBody).catch(errorBody),
  postFormData: (url, formData) =>
    axios.post(url, formData, { headers: { "Content-type": "multipart/form-data" } })
      .then(responseBody)
      .catch(errorBody),
  putMedia: (url, body) =>
    axios.put(url, body, { headers: { "Content-type": "application/x-www-form-urlencoded" } })
      .then(responseBody)
      .catch(errorBody),
};

export default requests;
