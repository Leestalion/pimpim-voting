import { useState } from "react";
import styles from "./TripCreation.module.css";
import { useTripData } from "src/hooks";

export const TripCreation = () => {
  const [name, setName] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const { createTrip } = useTripData();

  return (
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
  );
};
