import { Trip, User, Vote } from "src/types";
import { createContext } from "react";

export interface TripContextType {
    trip: Trip;
    currentDay: number;
    users: User[];
    userVotes: Vote[],
    votes: Vote[],
    fetchCurrentDay: () => Promise<number>;
    vote: (votes: {userId: string, voterId: string, rank: number}[]) => Promise<Vote[]>;
    fetchUserVotes: (user: User) => Promise<Vote[]>;
    fetchVotes: () => Promise<Vote[]>;
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
        startDate: "",
        endDate: "",
    },
    currentDay: 0,
    users: [],
    userVotes: [],
    votes: [],
    fetchCurrentDay: async () => 0,
    fetchUserVotes: async () => [],
    fetchVotes: async () => [],
    vote: async () => [],
    editTrip: () => {},
    deleteTrip: () => {},
    fetchUsers: () => {},
    addUser: () => {},
    editUser: () => {},
    deleteUser: () => {},
});