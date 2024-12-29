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
  deleteUserVotesService,
} from "src/services";
import LoadingComponent from "src/components/ui/Loading/LoadingComponent";

export const TripProvider = ({ children }: PropsWithChildren) => {
  const emptyTrip: Trip = { id: "", name: "", securityCode: "", startDate: "", endDate: "" };

  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("ID de voyage non fourni");
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
        setError("ID de voyage non fourni");
        setLoading(false);
        return;
      }

      const fetchedTrip = await fetchTripById(tripId);

      if (fetchedTrip) {
        setTrip(fetchedTrip);
      } else {
        setError("Voyage non trouvé ou n'a pas pu être récupéré.");
      }

      setLoading(false);
    };

    loadTrip();
  }, [tripId]);

  const editTrip = async (tripName: string, securityCode: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const newTrip = { id: trip.id, name: tripName, securityCode, startDate: trip.startDate, endDate: trip.endDate };
      await editTripService(newTrip);
      setTrip(newTrip);
    } catch (error) {
      console.error("Erreur lors de la modification du voyage:", error);
    }
  };

  const deleteTrip = async (securityCode: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      await deleteTripService(trip, securityCode);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du voyage:", error);
    }
  };

  const fetchUsers = useCallback(async () => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const users = await fetchUsersInTrip(trip.id);
      setUsers(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }, [trip]);

  const addUser = async (username: string, securityCode: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const user = { username, tripId: trip.id };
      await createUserInTrip(user, securityCode);
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur au voyage:", error);
    }
  };

  const editUser = async (id: string, newUsername: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const user = { id: id, username: newUsername, tripId: trip.id };
      await editUserService(user);
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
    }
  };

  const deleteUser = async (id: string, securityCode: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const user = { id: id, username: "", tripId: trip.id };
      await deleteUserService(user, securityCode);
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur du voyage:", error);
    }
  };

  const vote = async (
    votes_data: { userId: string; voterId: string; rank: number }[]
  ): Promise<Vote[]> => {
    if (!trip) throw new Error("Voyage non chargé");

    const votes = votes_data.map((vote) => ({
      ...vote,
      tripId: trip.id,
      day: 0,
    }));

    try {
      return await submitVote(votes);
    } catch (error) {
      console.error("Erreur lors de la soumission du vote:", error);
      return []
    }
  };

  const deleteUserVotes = async (userId: string) => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      await deleteUserVotesService(trip.id, userId);
    } catch (error) {
      console.error("Erreur lors de la suppression des votes:", error);
    }
  };

  const fetchCurrentDay = useCallback(async (): Promise<number> => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const day = await fetchCurrentDayByTripId(trip.id);
      if (!day) {
        throw new Error("Problème lors de la récupération du jour actuel");
      }
      setCurrentDay(day);
      return day;
    } catch (error) {
      console.error("Erreur lors de la récupération du jour actuel:", error);
      return 1;
    }
  }, [trip]);

  const fetchUserVotes = useCallback(async (user: User): Promise<Vote[]> => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const votes = await fetchVotesForUser(trip.id, user.id);
      if (!votes) {
        throw new Error("Problème lors de la récupération des votes");
      }
      setUserVotes(votes);
      return votes;
    } catch (error) {
      console.error("Erreur lors de la récupération des votes:", error);
      return [];
    }
  }, [trip]);

  const fetchVotes = useCallback(async (): Promise<Vote[]> => {
    if (!trip) throw new Error("Voyage non chargé");
    try {
      const votes = await fetchVotesService(trip.id);
      if (!votes) {
        throw new Error("Problème lors de la récupération des votes");
      }
      setVotes(votes);
      return votes;
    } catch (error) {
      console.error("Erreur lors de la récupération des votes:", error);
      return [];
    }
  }, [trip]);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Erreur: {error}</div>;

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
        deleteUserVotes,
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
