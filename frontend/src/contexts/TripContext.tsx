import { createContext } from "react";
import { TripData, Trips, VoteData } from "../types";


export interface TripContextType {
    trips: Trips | null;
    createTrip: (tripData: TripData) => void;
    submitVote: (voteData: VoteData) => void;
    fetchResults: (tripId: string) => void;
}

export const TripContext = createContext<TripContextType | undefined>(undefined);



