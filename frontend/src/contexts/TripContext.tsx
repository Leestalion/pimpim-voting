import { Trip, User } from "src/types";
import { createContext } from "react";

export interface TripContextType {
    trip: Trip;
    users: User[];
    editTrip: (tripName: string, securityCode: string) => void;
    deleteTrip: (securityCode: string) => void;
    fetchUsers: () => void;
    addUser: (username: string, securityCode: string) => void;
    editUser: (id: string, username: string) => void;
    deleteUser: (id: string, securityCode: string) => void;
}

export const TripContext = createContext<TripContextType>({
    trip: {
        id: "",
        name: "",
        securityCode: "",
    },
    users: [],
    editTrip: () => {},
    deleteTrip: () => {},
    fetchUsers: () => {},
    addUser: () => {},
    editUser: () => {},
    deleteUser: () => {},
});