import { PropsWithChildren, useCallback, useState } from "react";
import { Trip, VoteData } from "../types";
import { TripsContext } from "./TripsContext";
import {
  fetchTrips as fetchTripsService,
  createTrip as createTripService,
  submitVote as submitVoteService,
  fetchResults as fetchResultsService,
} from "src/services";
import { useNavigate } from "react-router-dom";

export const TripsProvider = ({ children }: PropsWithChildren) => {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const navigate = useNavigate();

  // Fetch trips data from the backend
  const fetchTrips = useCallback(async () => {
    try {
      const data = await fetchTripsService();
      setTrips(data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  }, []);

  // create a new trip
  const createTrip = async (tripData: {
    name: string;
    securityCode: string;
  }) => {
    try {
      const createdTrip = await createTripService(tripData);
      await fetchTrips();
      navigate(`/trip/${createdTrip.id}`);
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  // submit a vote
  const submitVote = async (voteData: VoteData) => {
    try {
      await submitVoteService(voteData);
      await fetchResults(voteData.tripId);
    } catch (err) {
      console.error("Error submitting vote:", err);
    }
  };

  // fetch results for a specific trip
  const fetchResults = async (tripId: string) => {
    try {
      const data = await fetchResultsService(tripId);
      setTrips((prevTrips: Trip[] | null) => {
        if (!prevTrips) {
          return prevTrips;
        }
        return prevTrips.map((trip) =>
          trip.id === tripId ? { ...trip, results: data } : trip
        );
      });
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  return (
    <TripsContext.Provider
      value={{ trips, fetchTrips, createTrip, submitVote, fetchResults }}
    >
      {children}
    </TripsContext.Provider>
  );
};
