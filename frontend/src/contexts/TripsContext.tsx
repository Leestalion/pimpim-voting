import { createContext } from "react";
import { Trips, VoteData } from "../types";


export interface TripsContextType {
    trips: Trips | null;
    fetchTrips: () => void;
    createTrip: (tripData: {name: string, securityCode: string}) => void;
    submitVote: (voteData: VoteData) => void;
    fetchResults: (tripId: string) => void;
}

export const TripsContext = createContext<TripsContextType | undefined>(undefined);



