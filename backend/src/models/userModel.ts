import { db } from "../db";
import { User } from "../types";

export const getUserById = (id: string) => {
  return db("users").where({ id }).first();
};

export const getAllUsersInTrip = (id: string) => {
  return db("users").where({ trip_id: id });
};

export const addUserInTrip = (user: User) => {
  return db("users").insert({ trip_id: user.tripId, username: user.username }).returning("*");
}

export const updateUser = (user: User) => {
  return db("users").where({ id: user.id }).update({ username: user.username }).returning("*");
}

export const deleteUser = (user: User) => {
  return db("users").where({ id: user.id }).delete();
}