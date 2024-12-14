import { userModel } from "../models";
import { User } from "../types";

export const getUserById = async (id: string) => {
    const user = await userModel.getUserById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const getAllUsersInTrip = async (tripId: string) => {
    const users = await userModel.getAllUsersInTrip(tripId);
    if (!users) {
        throw new Error("No users found in trip");
    }
    return users;
};

export const addUserInTrip = async (user: User) => {
    const newUser = await userModel.addUserInTrip(user);
    return newUser;
};

export const updateUser = async (user: User) => {
    const updatedUser = await userModel.updateUser(user);
    return updatedUser;
};