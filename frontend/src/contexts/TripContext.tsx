import { Trip, User } from "src/types";
import { createContext } from "react";

export interface TripContextType {
    trip: Trip;
    users: User[];
    fetchUsers: () => void;
    addUser: (username: string, securityCode: string) => void;
    editUser: (id: string, username: string) => void;
    removeUser: (username: string, securityCode: string) => void;
}

export const TripContext = createContext<TripContextType>({
    trip: {
        id: "",
        name: "",
        securityCode: "",
    },
    users: [],
    fetchUsers: () => {},
    addUser: () => {},
    editUser: () => {},
    removeUser: () => {},
});