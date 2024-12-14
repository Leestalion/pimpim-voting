import { createContext } from "react";
import { Trip, VoteData } from "../types";


export interface TripsContextType {
    trips: Trip[] | null;
    fetchTrips: () => void;
    createTrip: (tripData: {name: string, securityCode: string}) => void;
    submitVote: (voteData: VoteData) => void;
    fetchResults: (tripId: string) => void;
}

export const TripsContext = createContext<TripsContextType | undefined>(undefined);



