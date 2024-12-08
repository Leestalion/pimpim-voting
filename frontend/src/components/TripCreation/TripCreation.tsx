import { useState } from "react";
import styles from "./TripCreation.module.css";
import { useTrips } from "src/hooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const TripCreation = () => {
  const [name, setName] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();

  const { createTrip } = useTrips();

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTrip({ name, securityCode });
        }}
        className={styles.form}
      >
        <input
          type="text"
          placeholder="Trip Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Security Code"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Trip
        </button>
      </form>
    </div>
  );
};
