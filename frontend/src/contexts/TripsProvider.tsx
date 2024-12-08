import { ReactNode, useCallback, useState } from "react";
import { Trips, VoteData } from "../types";
import { TripsContext } from "./TripsContext";
import {
  fetchTrips as fetchTripsService,
  createTrip as createTripService,
  submitVote as submitVoteService,
  fetchResults as fetchResultsService,
} from "src/services";

export const TripsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [trips, setTrips] = useState<Trips | null>(null);

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
      await createTripService(tripData);
      await fetchTrips();
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
      setTrips((prevTrips: Trips | null) => {
        if (!prevTrips) {
          return prevTrips;
        }
        return {
          ...prevTrips,
          [tripId]: {
            ...prevTrips[tripId],
            results: data,
          },
        };
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
