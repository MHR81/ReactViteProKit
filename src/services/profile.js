import requests from "./api/base-api";

const profileService = {
    getProfile: () => requests.get("/profile"),
    updateProfile: (profileData) => requests.put("/profile", profileData),
    changePassword: (passwordData) => requests.post("/profile/change-password", passwordData),
};