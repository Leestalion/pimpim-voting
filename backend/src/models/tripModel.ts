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

export const createTrip = (trip: Trip) => {
  return db("trips").insert({ name: trip.name, security_code: trip.securityCode }).returning("*");
};
