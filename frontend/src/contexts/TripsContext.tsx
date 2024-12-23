import { createContext } from "react";
import { Trip } from "../types";


export interface TripsContextType {
    trips: Trip[] | null;
    fetchTrips: () => void;
    createTrip: (tripData: {name: string, securityCode: string, startDate: string, endDate: string}) => void;
}

export const TripsContext = createContext<TripsContextType | undefined>(undefined);



