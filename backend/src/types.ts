export interface Trip {
    id: string;
    name: string;
    securityCode: string;
}

export interface User {
    id: string;
    username: string;
    tripId: string;
}

export interface Vote {
    id: string;
    userId: string;
    tripId: string;
    day: number;
}