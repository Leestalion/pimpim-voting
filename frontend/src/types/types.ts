export interface Trip {
    id: string;
    name: string;
    securityCode: string;
    startDate: string;
    endDate: string;
}

export interface User {
    username: string;
    id: string;
}

export interface Vote {
    day: number;
    tripId: string;
    userId: string;
    voterId: string;
    rank: number;
}

export interface VotedUser {
    userId: string;
    username: string;
    score: number;
    day: number;
}

export interface Results {
    [date: string]: Record<string, number>;
}