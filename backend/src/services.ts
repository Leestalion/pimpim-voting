import path from "path";
import { Data, Trip } from "./types";
import fs from "fs";

// Path to JSON file
const DATA_PATH = path.join(__dirname, "data.json");  // This will now be in the /data folder mounted from the volume

// Helper function to read/write data to JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeData = (data: Data): void => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

export function getAllTrips(): Record<string, Trip> {
    const data = readData();
    return data.trips;
}

export function createTrip(trip: Trip): void {
    const data = readData();
    data.trips = { ...(data.trips || {}), [trip.id]: trip };
    writeData(data);
}

export function voteForTrip(tripId: string, username: string): void {
    const today = new Date().toISOString().split('T')[0];

    const data = readData();
    const trip = data.trips[tripId];

    if (!trip) {
        console.error("Trip not found");
        throw new Error("Trip not found");
    };

    trip.votes[today] = trip.votes[today] || {};
    trip.votes[today][username] = (trip.votes[today][username] || 0) + 1;
    writeData(data);
}

export function createUserInTrip(tripId: string, username: string, securityCode: string): void {

    // read the current users data
    const data = readData();
    const trip = data.trips[tripId];

    if (!trip) {
        console.error("Trip not found");
        throw new Error("Trip not found");
    }

    if(trip.securityCode !== securityCode) {
        console.error("Invalid security code");
        throw new Error("Invalid security code");
    }

    // add the user if not already in the trip
    if(!trip.users.includes(username)) {
        trip.users.push(username);
        writeData(data);
        return;
    } else {
        console.error("User already exists");
        throw new Error("User already exists");
    }
}

export function getAllUsersInTrip(tripId: string): string[] {
    const data = readData();
    const trip = data.trips[tripId];

    if (!trip) {
        console.error("Trip not found");
        throw new Error("Trip not found");
    }

    return trip.users;
}

export function getTripResults(tripId: string) {
    const data = readData();
    const trip = data.trips[tripId];

    if (!trip) {
        console.error("Trip not found");
        throw new Error("Trip not found");
    }

    return trip.votes;
}