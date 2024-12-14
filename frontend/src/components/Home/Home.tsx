import { useTrips } from "src/hooks";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { Trip } from "src/types";

export const Home = () => {
  const { trips, fetchTrips } = useTrips();

  const navigate = useNavigate();

  const handleAddTrip = () => {
    navigate("/trip-creation");
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className={styles.homePage}>
      {trips && trips.length > 0 ? (
        <div className={styles.tripList}>
          {trips.map((trip: Trip) => (
            <Link
              key={trip.id}
              to={`/trip/${trip.id}`}
              className={styles.tripLink}
            >
              <div className={styles.tripCard}>
                <h3>{trip.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Aucun voyage disponible</p>
      )}
      <button className={styles.addTripButton} onClick={handleAddTrip}>
        Ajouter un voyage
      </button>
    </div>
  );
};
