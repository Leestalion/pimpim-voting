import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import { TripContext } from "./TripContext";
import { Trip, User } from "src/types";
import { fetchUsersInTrip, createUserInTrip, fetchTripById, removeUserFromTrip, editUserService } from "src/services";

export const TripProvider = ({ children }: PropsWithChildren) => {
    
    const emptyTrip: Trip = { id: '', name: '', securityCode: '' };

    const { tripId } = useParams<{ tripId: string}>();

    if(!tripId) {
        throw new Error("Trip ID not provided");
    }

    const [ trip, setTrip ] = useState<Trip>(emptyTrip);
    const [ users, setUsers ] = useState<User[]>([]);
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

    const fetchUsers = useCallback(async () => {
        if (!trip) throw new Error("Trip not loaded");
        try {
            const users = await fetchUsersInTrip(trip.id);
            setUsers(users);
        } catch(error) {
            console.error("Error fetching users:", error);
        }
    }, [trip]);

    const addUser = async (username: string, securityCode: string) => {
        if (!trip) throw new Error("Trip not loaded");
        try {
            const user = { username, tripId: trip.id };
            await createUserInTrip(user, securityCode);
            await fetchUsers();
        } catch (error) {
            console.error("Error adding user to trip:", error);
        }
    }

    const editUser = async (id: string, newUsername: string) => {
        if(!trip) throw new Error("Trip not loaded");
        try {
            const user = { id: id, username: newUsername, tripId: trip.id };
            await editUserService(user);
            await fetchUsers();
        } catch(error) {
            console.error("Error editing user:", error);
        }
    };

    const removeUser = (username: string, securityCode: string) => {
        if (!trip) throw new Error("Trip not loaded");
        if (trip.securityCode !== securityCode) throw new Error("Invalid security code");
        try {
            removeUserFromTrip(tripId, username, securityCode);
            // const updatedTrip = { ...trip, users: trip.users.filter((user: User) => user.username !== username) };
            // setTrip(updatedTrip);
        } catch (error) {
            console.error("Error removing user from trip:", error);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TripContext.Provider value={{ trip, users, fetchUsers, addUser, editUser, removeUser }}>
            {children}
        </TripContext.Provider>
    );
};