import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripContext } from "./TripContext";
import { Trip, User, Vote } from "src/types";
import {
  fetchCurrentDayByTripId,
  submitVote,
  fetchVotesService,
  fetchVotesForUser,
  editTripService,
  deleteTripService,
  fetchUsersInTrip,
  createUserInTrip,
  fetchTripById,
  deleteUserService,
  editUserService,
} from "src/services";
import LoadingComponent from "src/components/ui/Loading/LoadingComponent";

export const TripProvider = ({ children }: PropsWithChildren) => {
  const emptyTrip: Trip = { id: "", name: "", securityCode: "", startDate: "", endDate: "" };

  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("Trip ID not provided");
  }

  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip>(emptyTrip);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Vote[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);

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

  const editTrip = async (tripName: string, securityCode: string) => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const newTrip = { id: trip.id, name: tripName, securityCode, startDate: trip.startDate, endDate: trip.endDate };
      await editTripService(newTrip);
      setTrip(newTrip);
    } catch (error) {
      console.error("Error editing trip:", error);
    }
  };

  const deleteTrip = async (securityCode: string) => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      await deleteTripService(trip, securityCode);
      navigate("/");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const fetchUsers = useCallback(async () => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const users = await fetchUsersInTrip(trip.id);
      setUsers(users);
    } catch (error) {
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
  };

  const editUser = async (id: string, newUsername: string) => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const user = { id: id, username: newUsername, tripId: trip.id };
      await editUserService(user);
      await fetchUsers();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const deleteUser = async (id: string, securityCode: string) => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const user = { id: id, username: "", tripId: trip.id };
      await deleteUserService(user, securityCode);
      await fetchUsers();
    } catch (error) {
      console.error("Error removing user from trip:", error);
    }
  };

  const vote = async (
    votes_data: { userId: string; voterId: string; rank: number }[]
  ): Promise<Vote[]> => {
    if (!trip) throw new Error("Trip not loaded");

    const votes = votes_data.map((vote) => ({
      ...vote,
      tripId: trip.id,
      day: 0,
    }));

    try {
      return await submitVote(votes);
    } catch (error) {
      console.error("Error submitting vote:", error);
      return []
    }
  };

  const fetchCurrentDay = useCallback(async (): Promise<number> => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const day = await fetchCurrentDayByTripId(trip.id);
      if (!day) {
        throw new Error("Problem fetching current day");
      }
      setCurrentDay(day);
      return day;
    } catch (error) {
      console.error("Error fetching current day:", error);
      return 1;
    }
  }, [trip]);

  const fetchUserVotes = useCallback(async (user: User): Promise<Vote[]> => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const votes = await fetchVotesForUser(trip.id, user.id);
      if (!votes) {
        throw new Error("Problem fetching votes");
      }
      setUserVotes(votes);
      return votes;
    } catch (error) {
      console.error("Error fetching votes:", error);
      return [];
    }
  }, [trip]);

  const fetchVotes = useCallback(async (): Promise<Vote[]> => {
    if (!trip) throw new Error("Trip not loaded");
    try {
      const votes = await fetchVotesService(trip.id);
      if (!votes) {
        throw new Error("Problem fetching votes");
      }
      setVotes(votes);
      return votes;
    } catch (error) {
      console.error("Error fetching votes:", error);
      return [];
    }
  }, [trip]);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;

  return (
    <TripContext.Provider
      value={{
        trip,
        currentDay,
        vote,
        votes,
        userVotes,
        fetchCurrentDay,
        fetchVotes,
        fetchUserVotes,
        editTrip,
        deleteTrip,
        users,
        fetchUsers,
        addUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
