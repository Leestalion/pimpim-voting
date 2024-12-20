import { db } from "../db";
import { Trip } from "../types";

export const getTripById = (id: string) => {
  return db("trips").select({
    id: "id",
    name: "name",
    securityCode: "security_code",
  }).where({ id }).first();
};

export const getAllTrips = () => {
  return db("trips").select({
    id: "id",
    name: "name",
    securityCode: "security_code",
  });
};

export const createTrip = async (trip: Trip) => {
  const rows = await db("trips").insert({ name: trip.name, security_code: trip.securityCode }).returning("*");
  return rows[0];
};

export const editTrip = (trip: Trip) => {
  return db("trips").where({ id: trip.id }).update({ name: trip.name, security_code: trip.securityCode }).returning("*");
};

export const deleteTrip = (trip: Trip) => {
  return db("trips").where({ id: trip.id }).delete();
};