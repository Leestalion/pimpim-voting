import { ReactNode, useState } from "react";
import { TripData, Trips, VoteData } from "../types";
import { TripContext } from "./TripContext";

export const TripProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [trips, setTrips] = useState<Trips | null>(null);
    
    const API_URL = "http://localhost:5000/";

    // Fetch trips data from the backend
    const fetchTrips = async () => {
        try {
            const response = await fetch(`${API_URL}/trips`);
            const data: Trips = await response.json(); // Use the Trips type here
            setTrips(data);
        } catch (err) {
            console.error("Error fetching trips:", err);
        }
    };

    // create a new trip
    const createTrip = async (tripData: TripData) => {
        try {
            const response = await fetch(`${API_URL}/trip`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tripData),
            });
            if (response.ok) {
                fetchTrips();
            } else {
                console.error("Error creating trip:", response.statusText);
            }
        } catch (err) {
            console.error("Error creating trip:", err);
        }
    };

    // submit a vote
    const submitVote = async (voteData: VoteData) => {
        try {
            const response = await fetch(`${API_URL}/trip/${voteData.tripId}/vote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(voteData),
            });
            if (response.ok) {
                fetchResults(voteData.tripId);
            } else {
                console.error("Error submitting vote:", response.statusText);
            }
        } catch (err) {
            console.error("Error submitting vote:", err);
        }
    };

    // fetch results for a specific trip
    const fetchResults = async (tripId: string) => {
        try {
            const response = await fetch(`${API_URL}/trip/${tripId}/results`);
            const data = await response.json();
            setTrips((prevTrips: Trips | null) => {
                if (!prevTrips) {
                    return prevTrips;
                }
                return {
                    ...prevTrips,
                    [tripId]: {
                        ...prevTrips[tripId],
                        results: data,
                    },
                };
                
            });
        } catch (err) {
            console.error("Error fetching results:", err);
        }
    };

    return (
        <TripContext.Provider value={{ trips, createTrip, submitVote, fetchResults }}>
            {children}
        </TripContext.Provider>
    );
};