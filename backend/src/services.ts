import path from "path";
import { Data, Trip } from "./types";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`  // Fallback to development if NODE_ENV isn't set
});

// Default to './data' locally, use '/data' on Fly.io
const DATA_DIR = process.env.DATA_DIR || '';
const DATA_PATH = path.join(DATA_DIR, 'data.json');

// Check if the directory exists
if (!fs.existsSync(DATA_DIR)) {
    // If the directory does not exist, create it
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Directory ${DATA_DIR} was created.`);
  }

// Check if the file exists and create one if it doesn't
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({}, null, 2), "utf-8"); // Create an empty JSON file
    console.log(`File ${DATA_PATH} was created.`);
}

console.log(`Using data file at: ${DATA_PATH}`);

// Helper function to read/write data to JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeData = (data: Data): void => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

export function getAllTrips(): Record<string, Trip> {
    const data = readData();
    return data.trips;
}

export function getTripById(tripId: string): Trip {
    const data = readData();
    const trip = data.trips[tripId];
    if (!trip) {
        console.error("Trip not found");
        throw new Error("Trip not found");
    }
    return trip;
}

export function createTrip(trip: Trip): void {
    const tripId = uuidv4();
    trip.id = tripId;
    trip.users = [];
    trip.votes = {};
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