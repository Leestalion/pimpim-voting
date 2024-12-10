import { getAllTrips } from "./services";
import { Trip } from "./types";

export function tripNameExists(tripName: string): boolean {
    const existingTrips: Record<string, Trip> = getAllTrips();
    return existingTrips && Object.values(existingTrips).some(trip => trip.name === tripName);
}