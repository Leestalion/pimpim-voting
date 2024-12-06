import { ReactNode, useCallback, useState } from "react";
import { Trips, VoteData } from "../types";
import { TripContext } from "./TripContext";
import { axiosInstance } from "../services";

export const TripProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [trips, setTrips] = useState<Trips | null>(null);
    
    // Fetch trips data from the backend
    const fetchTrips = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/trips");
            const data: Trips = response.data; // Use the Trips type here
            setTrips(data);
            
        } catch (err) {
            console.error("Error fetching trips:", err);
        }
    }, []);

    // create a new trip
    const createTrip = async (tripData: {name: string, securityCode: string}) => {
        try {
            const response = await axiosInstance.post("/trips", tripData);
            if (response.status === 201) {
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
            const response = await axiosInstance.post(`/trip/${voteData.tripId}/vote`, voteData);
            if (response.status === 200) {
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
            const response = await axiosInstance.get(`/trip/${tripId}/results`);
            const data = response.data;
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
        <TripContext.Provider value={{ trips, fetchTrips, createTrip, submitVote, fetchResults }}>
            {children}
        </TripContext.Provider>
    );
};