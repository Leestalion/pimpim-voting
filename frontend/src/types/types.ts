export interface Trip {
    id: string;
    name: string;
    securityCode: string;
}

export interface User {
    username: string;
    id: string;
}

export interface VoteData {
    tripId: string;
    username: string;
    date: string;
    vote: number;
}

export interface Results {
    [date: string]: Record<string, number>;
}