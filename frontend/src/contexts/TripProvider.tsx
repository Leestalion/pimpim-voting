import { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TripContext } from "./TripContext";
import { Trip } from "src/types";
import { createUserInTrip, fetchTripById, removeUserFromTrip } from "src/services";

export const TripProvider = ({ children }: PropsWithChildren) => {
    
    const emptyTrip: Trip = { name: '', users: [], securityCode: '', votes: {} };

    const { tripId } = useParams<{ tripId: string}>();

    if(!tripId) {
        throw new Error("Trip ID not provided");
    }

    const [trip, setTrip] = useState<Trip>(emptyTrip);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const loadTrip = async () => {
            setLoading(true);
            setError(null);

            if (!tripId) {
                setError("Trip ID not provided");
                setLoading(false);
                return;
            }

            const fetchedTrip = await fetchTripById(tripId);

            if (fetchedTrip) {
                setTrip(fetchedTrip);
            } else {
                setError("Trip not found or could not be fetched.");
            }

            setLoading(false);
        };

        loadTrip();
    }, [tripId]);

    const addUser = (username: string, securityCode: string) => {
        if (!trip) throw new Error("Trip not loaded");
        if (trip.securityCode !== securityCode) throw new Error("Invalid security code");
        try {
            createUserInTrip(tripId, username, securityCode);
            const updatedTrip = { ...trip, users: [...trip.users, username] };
            setTrip(updatedTrip);
        } catch (error) {
            console.error("Error adding user to trip:", error);
        }
    }

    const removeUser = (username: string, securityCode: string) => {
        if (!trip) throw new Error("Trip not loaded");
        if (trip.securityCode !== securityCode) throw new Error("Invalid security code");
        try {
            removeUserFromTrip(tripId, username, securityCode);
            const updatedTrip = { ...trip, users: trip.users.filter((user: string) => user !== username) };
            setTrip(updatedTrip);
        } catch (error) {
            console.error("Error removing user from trip:", error);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TripContext.Provider value={{ trip, addUser, removeUser }}>
            {children}
        </TripContext.Provider>
    );
}
    