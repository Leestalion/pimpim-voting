import { axiosInstance } from "./axiosInstance";

export const developerPasswordMatch = async (password: string) => {
  try {
    const response = await axiosInstance.post("/verify-password", {
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
