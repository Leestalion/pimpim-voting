import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "src/hooks";
import { HomeUI } from "src/components/ui";
import LoadingComponent from "src/components/ui/Loading/LoadingComponent";

export const Home = () => {
  const { trips, fetchTrips } = useTrips();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (!trips) {
    return <LoadingComponent />;
  }

  const handleAddTrip = () => {
    navigate("/trip-creation");
  };

  return <HomeUI trips={trips} onAddTrip={handleAddTrip} />;
};
