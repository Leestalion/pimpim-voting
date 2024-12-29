import React from "react";
import styles from "./TripCreation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

interface TripCreationUIProps {
  name: string;
  securityCode: string;
  startDate: string;
  endDate: string;
  onNameChange: (value: string) => void;
  onSecurityCodeChange: (value: string) => void;
  onStartDateChange : (value: string) => void;
  onEndDateChange : (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const TripCreationUI: React.FC<TripCreationUIProps> = ({
  name,
  securityCode,
  startDate,
  endDate,
  onNameChange,
  onSecurityCodeChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  onBack,
}) => {
  return (
    <div>
      <Button type="button" onClick={onBack} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
      </Button>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nom du voyage"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Code de sécurité"
          value={securityCode}
          onChange={(e) => onSecurityCodeChange(e.target.value)}
          className={styles.input}
          required
        />
        <label>Date de début
        <input
          type="date"
          value={startDate}
          onClick={(e) => e.currentTarget.showPicker()}
          onChange={(e) => onStartDateChange(e.target.value)}
          className={styles.input}
          required
        /></label>
        <label>Date de fin
        <input
          type="date"
          value={endDate}
          onClick={(e) => e.currentTarget.showPicker()}
          onChange={(e) => onEndDateChange(e.target.value)}
          className={styles.input}
          required
        />
        </label>
        <Button type="submit" className={styles.button}>
          Créer un voyage
        </Button>
      </form>
    </div>
  );
};
