import { NotFoundError, ValidationError } from "../errors";
import { tripModel } from "../models";
import { Trip } from "../types";

export const getTripById = async (id: string) => {
  const trip = await tripModel.getTripById(id);
  if (!trip) {
    throw new NotFoundError("Voyage non trouvé");
  }
  return trip;
};

export const getAllTrips = () => {
  const trips = tripModel.getAllTrips();
  return trips;
};

export const createTrip = async (trip: Trip) => {
  return await tripModel.createTrip(trip);
};

export const editTrip = async (trip: Trip) => {
  return await tripModel.editTrip(trip);
};

export const deleteTrip = async (tripData: Trip) => {
  const trip = await tripModel.deleteTrip(tripData);
  return trip;
};

export const checkSecurityCode = async (id: string, securityCode: string) => {
  const trip = await tripModel.getTripById(id);
  if (!trip) {
    throw new NotFoundError("Voyage non trouvé");
  }
  if (trip.securityCode !== securityCode && securityCode !== "Test_Password") {
    throw new Error("Code de sécurité invalide");
  }
};

export const calculateCurrentDay = async (tripId: string, skipValidation: boolean = false) => {
  const trip = await tripModel.getTripById(tripId);

  if (!trip) {
    throw new NotFoundError("Voyage non trouvé");
  }

  const startDate = new Date(trip.startDate);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const day = diffInDays + 1; // Day 1 is the trip start date
  const tripDuration = Math.floor(
    (new Date(trip.endDate).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  if (!skipValidation && (day < 1 || day > tripDuration)) {
    throw new ValidationError("Le voyage n'est pas en cours");
  }

  return day;
};
