export interface Trip {
    id: string;
    name: string;
    securityCode: string;
    users: string[];
    votes: Record<string, Record<string, number>>;
}

export interface Data {
    trips: Record<string, Trip>;
}