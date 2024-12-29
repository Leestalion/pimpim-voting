import { Trip, User, Vote } from "src/types";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";

export const fetchTrips = async (): Promise<Trip[]> => {
  const response = await axiosInstance.get("/trips");
  return response.data;
};

export const fetchTripById = async (tripId: string) => {
  const response = await axiosInstance.get(`/trip/${tripId}`);
  return response.data;
};

export const createTrip = async (tripData: {
  name: string;
  securityCode: string;
}): Promise<Trip> => {
  const response = await axiosInstance.post("/trip", tripData);
  if (response.status !== 201) {
    throw new Error(`Failed to create trip: ${response.statusText}`);
  }
  return response.data;
};

export const editTripService = async (trip: Trip): Promise<void> => {
  const response = await axiosInstance.put("/trip", trip);
  if (response.status !== 200) {
    toast.error("Échec de la mise à jour du voyage");
    throw new Error(`Failed to edit trip: ${response.statusText}`);
  }
};

export const fetchCurrentDayByTripId = async (tripId: string): Promise<number> => {
  const response = await axiosInstance.get(`/trip/${tripId}/day`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch current day: ${response.statusText}`);
  }
  return response.data;
};

export const deleteTripService = async (
  trip: Trip,
  securityCode: string
): Promise<void> => {
  const response = await axiosInstance.delete(`/trip`, {
    data: { trip, securityCode },
  });
  if (response.status !== 200) {
    throw new Error(`Failed to delete trip: ${response.statusText}`);
  }
};

export const submitVote = async (votes: Vote[]): Promise<Vote[]> => {
  const response = await axiosInstance.post(`/trip/vote`, { votes });
  if (response.status !== 200) {
    throw new Error(`Failed to submit vote: ${response.statusText}`);
  }
  const newVotes = response.data.map(
    (vote: {
      create_at: string;
      id: string;
      rank: number;
      trip_id: string;
      user_id: string;
      vote_day: number;
      voter_id: string;
    }) => ({
      userId: vote.user_id,
      voterId: vote.voter_id,
      rank: vote.rank,
      tripId: vote.trip_id,
      day: vote.vote_day,
    })
  );
  toast.success("Vote soumis avec succès");
  return newVotes
};

export const fetchVotesForUser = async (
  tripId: string,
  userId: string
): Promise<Vote[]> => {
  const response = await axiosInstance.get(`/trip/${tripId}/vote/${userId}`);
  const votes = response.data.map(
    (vote: {
      create_at: string;
      id: string;
      rank: number;
      trip_id: string;
      user_id: string;
      vote_day: number;
      voter_id: string;
    }) => ({
      userId: vote.user_id,
      voterId: vote.voter_id,
      rank: vote.rank,
      tripId: vote.trip_id,
      day: vote.vote_day,
    })
  );
  return votes;
};

export const fetchVotesService = async (tripId: string): Promise<Vote[]> => {
  const response = await axiosInstance.get(`/trip/${tripId}/votes`);
  const votes = response.data.map(
    (vote: {
      create_at: string;
      id: string;
      rank: number;
      trip_id: string;
      user_id: string;
      vote_day: number;
      voter_id: string;
    }) => ({
      userId: vote.user_id,
      voterId: vote.voter_id,
      rank: vote.rank,
      tripId: vote.trip_id,
      day: vote.vote_day,
    })
  );
  return votes;
};

export const deleteUserVotesService = async (tripId: string, userId: string): Promise<void> => {
  const response = await axiosInstance.delete(`/trip/${tripId}/vote/${userId}`);
  if (response.status !== 200) {
    throw new Error(`Echec de la suppression des votes : ${response.statusText}`);
  }
};

export const fetchUsersInTrip = async (tripId: string): Promise<User[]> => {
  const response = await axiosInstance.get(`/trip/${tripId}/users`);
  return response.data;
};

export const createUserInTrip = async (
  user: { username: string; tripId: string },
  securityCode: string
): Promise<void> => {
  const response = await axiosInstance.post(`/trip/user`, {
    user,
    securityCode,
  });
  if (response.status !== 201) {
    throw new Error(`Failed to create user in trip: ${response.statusText}`);
  }
};

export const editUserService = async (user: User): Promise<void> => {
  const response = await axiosInstance.put(`/trip/user`, user);
  if (response.status !== 200) {
    throw new Error(`Failed to edit user: ${response.statusText}`);
  }
};

export const deleteUserService = async (
  user: User,
  securityCode: string
): Promise<void> => {
  const response = await axiosInstance.delete(`/trip/user/`, {
    data: { user, securityCode },
  });
  if (response.status !== 200) {
    throw new Error(`Failed to delete user: ${response.statusText}`);
  }
};