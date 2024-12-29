import { userModel } from "../models";
import { User } from "../types";

export const getUserById = async (id: string) => {
    const user = await userModel.getUserById(id);
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }
    return user;
};

export const getAllUsersInTrip = async (tripId: string) => {
    const users = await userModel.getAllUsersInTrip(tripId);
    if (!users) {
        throw new Error("Aucun utilisateur trouvé");
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

export const deleteUser = async (user: User) => {
    const deletedUser = await userModel.deleteUser(user);
    return deletedUser;
};