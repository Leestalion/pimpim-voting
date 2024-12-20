export interface Trip {
    id: string;
    name: string;
    securityCode: string;
}

export interface User {
    username: string;
    id: string;
}

export interface Vote {
    tripId: string;
    userId: string;
    voterId: string;
    rank: number;
}

export interface VotedUser {
    userId: string;
    username: string;
    score: number;
}

export interface Results {
    [date: string]: Record<string, number>;
}