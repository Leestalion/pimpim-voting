import { createContext } from "react";
import { Trips, VoteData } from "../types";


export interface TripContextType {
    trips: Trips | null;
    fetchTrips: () => void;
    createTrip: (tripData: {name: string, securityCode: string}) => void;
    submitVote: (voteData: VoteData) => void;
    fetchResults: (tripId: string) => void;
}

export const TripContext = createContext<TripContextType | undefined>(undefined);



