import requests from "./api/base-api";

const authService = {
    login: (data) => requests.post("/auth/login", data),
    register: (userData) => requests.post("/auth/register", userData),
    logout: () => requests.post("/auth/logout"),
};