import { userModel } from "../models";

export const getUserById = async (id: string) => {
    const user = await userModel.getUserById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};