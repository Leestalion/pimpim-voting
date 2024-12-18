import { tripModel } from "../models";
import { Trip } from "../types";
import { tripValidator } from "../validators";

export const getTripById = async (id: string) => {
    const trip = await tripModel.getTripById(id);
    if (!trip) {
        throw new Error("Trip not found");
    }
    return trip;
};

export const getAllTrips = () => {
    const trips = tripModel.getAllTrips();
    return trips;
};

export const createTrip = async (tripData: Trip) => {
    try {
        tripValidator.validateCreateTrip(tripData);
    } catch (err) {
        throw new Error("Invalid trip");
    }
    const trip = await tripModel.createTrip(tripData);
    return trip;
};

export const editTrip = async (tripData: Trip) => {
    try {
        tripValidator.validateEditTrip(tripData);
    } catch (err) {
        throw new Error("Invalid trip");
    }
    const trip = await tripModel.editTrip(tripData);
    return trip;
};

export const deleteTrip = async (tripData: Trip) => {
    const trip = await tripModel.deleteTrip(tripData);
    return trip;
};

export const checkSecurityCode = async (id: string, securityCode: string) => {
    const trip = await tripModel.getTripById(id);
    if (!trip) {
        throw new Error("Trip not found");
    }
    if (trip.securityCode !== securityCode) {
        throw new Error("Invalid security code");
    }
};