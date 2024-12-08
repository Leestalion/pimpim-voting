import { useTrips } from "src/hooks";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect } from "react";

export const Home = () => {
  const { trips, fetchTrips } = useTrips();

  const navigate = useNavigate();

  const handleAddTrip = () => {
    navigate("/trip-creation");
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const tripList = trips ? Object.entries(trips) : []; // Convertir en un tableau de tuples [tripId, Trip]

  return (
    <div className={styles.homePage}>
      {tripList.length > 0 ? (
        <div className={styles.tripList}>
          {tripList.map(([tripId, trip]) => (
            <Link key={tripId} to={`/trip/${tripId}`} className={styles.tripLink}>
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
