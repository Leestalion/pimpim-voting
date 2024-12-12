export interface Trip {
    id: string;
    name: string;
    securityCode: string;
}

export interface Data {
    trips: Record<string, Trip>;
}