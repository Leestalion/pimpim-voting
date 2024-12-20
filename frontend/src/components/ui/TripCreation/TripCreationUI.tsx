import React from "react";
import styles from "./TripCreation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface TripCreationUIProps {
  name: string;
  securityCode: string;
  onNameChange: (value: string) => void;
  onSecurityCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const TripCreationUI: React.FC<TripCreationUIProps> = ({
  name,
  securityCode,
  onNameChange,
  onSecurityCodeChange,
  onSubmit,
  onBack,
}) => {
  return (
    <div>
      <button type="button" onClick={onBack} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
      </button>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Trip Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Security Code"
          value={securityCode}
          onChange={(e) => onSecurityCodeChange(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Trip
        </button>
      </form>
    </div>
  );
};
