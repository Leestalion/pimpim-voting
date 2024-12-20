import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "src/hooks";
import { HomeUI } from "src/components/ui";

export const Home = () => {
  const { trips, fetchTrips } = useTrips();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (!trips) {
    return <p>Loading...</p>;
  }

  const handleAddTrip = () => {
    navigate("/trip-creation");
  };

  return <HomeUI trips={trips} onAddTrip={handleAddTrip} />;
};
