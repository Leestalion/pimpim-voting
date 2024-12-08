import { Trip } from "src/types";
import { createContext } from "react";

export interface TripContextType {
    trip: Trip;
    addUser: (username: string, securityCode: string) => void;
    removeUser: (username: string, securityCode: string) => void;
}

export const TripContext = createContext<TripContextType>({
    trip: {
        name: "",
        securityCode: "",
        users: [],
        votes: {} as const
    } as const,
    addUser: () => {},
    removeUser: () => {},
});