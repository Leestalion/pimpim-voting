import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Trip } from "src/types";
import { useDeveloper } from "src/hooks";
import { Button } from "../Button";

interface HomeUIProps {
  trips: Trip[];
  onAddTrip: () => void;
}

export const HomeUI = ({ trips, onAddTrip }: HomeUIProps) => {
  const { isDeveloperMode } = useDeveloper();
  return (
    <div className={styles.homePage}>
      {trips && trips.length > 0 ? (
        <div className={styles.tripList}>
          {trips.map((trip) => (
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
      {isDeveloperMode && (
        <Button className={styles.addTripButton} onClick={onAddTrip}>
          Ajouter un voyage
        </Button>
      )}
    </div>
  );
};
