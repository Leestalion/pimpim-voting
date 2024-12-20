import { PropsWithChildren, useCallback, useState } from "react";
import { Trip } from "../types";
import { TripsContext } from "./TripsContext";
import {
  fetchTrips as fetchTripsService,
  createTrip as createTripService,
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

  return (
    <TripsContext.Provider
      value={{ trips, fetchTrips, createTrip }}
    >
      {children}
    </TripsContext.Provider>
  );
};
