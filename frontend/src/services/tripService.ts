import { Results, Trips } from "src/types";
import { axiosInstance } from "./axiosInstance";

export const fetchTrips = async(): Promise<Trips> => {
    const response = await axiosInstance.get("/trips");
    return response.data;
};

export const fetchTripById = async (tripId: string) => {
    const response = await axiosInstance.get(`/trip/${tripId}`);
    return response.data;
}

export const createTrip = async (tripData: {name: string, securityCode: string}): Promise<void> => {
    const response = await axiosInstance.post("/trip", tripData);
    if (response.status !== 201) {
        throw new Error(`Failed to create trip: ${response.statusText}`);
    }
};

export const submitVote = async (voteData: {tripId: string, username: string}): Promise<void> => {
    const response = await axiosInstance.post(`/trip/${voteData.tripId}/vote`, voteData);
    if (response.status !== 200) {
        throw new Error(`Failed to submit vote: ${response.statusText}`);
    }
};

export const fetchResults = async (tripId: string): Promise<Results> => {
    const response = await axiosInstance.get(`/trip/${tripId}/results`);
    return response.data;
}

export const createUserInTrip = async (tripId: string, username: string, securityCode: string): Promise<void> => {
    const response = await axiosInstance.post(`/trip/${tripId}/user`, {username, securityCode});
    if (response.status !== 200) {
        throw new Error(`Failed to create user in trip: ${response.statusText}`);
    }
};

export const removeUserFromTrip = async (tripId: string, username: string, securityCode: string): Promise<void> => {
    const response = await axiosInstance.post(`/trip/${tripId}/user/remove`, { username, securityCode });
    if (response.status !== 200) {
        throw new Error(`Failed to remove user from trip: ${response.statusText}`);
    }
}