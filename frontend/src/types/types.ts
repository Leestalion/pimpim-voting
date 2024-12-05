export interface Trip {
    name: string;
    securityCode: string;
    users: string[];
    votes: Record<string, Record<string, number>>; // Date -> User -> Vote
}

export interface Trips {
    [tripId: string]: Trip;
}

export interface VoteData {
    tripId: string;
    username: string;
    date: string;
    vote: number;
}

export interface TripData {
    tripId: string;
    name: string;
    securityCode: string;
    users: string[];
}