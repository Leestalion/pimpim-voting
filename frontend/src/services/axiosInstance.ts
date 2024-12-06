import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${window.location.origin.replace(/:\d+$/, ":5000")}`,
    headers: { "Content-Type": "application/json" },
});