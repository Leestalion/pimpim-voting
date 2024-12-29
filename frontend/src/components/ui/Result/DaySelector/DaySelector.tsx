import { useState } from "react";
import styles from "./DaySelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "src/components/ui";

interface DaySelectorProps {
  currentDay: number;
  duration: number;
  setResultDay: (day: number) => void;
}

export const DaySelector = ({
  currentDay,
  setResultDay,
  duration,
}: DaySelectorProps) => {
  const [day, setDay] = useState(currentDay);

  const handlePreviousDay = () => {
    setDay((prevDay) => {
      const newDay = prevDay > 1 ? prevDay - 1 : prevDay;
      setResultDay(newDay);
      return newDay;
    });
  };

  const handleNextDay = () => {
    setDay((prevDay) => {
      const newDay = prevDay + 1;
      setResultDay(newDay);
      return newDay;
    });
  };

  return (
    <div className={styles.daySelector}>
      <Button
        onClick={handlePreviousDay}
        className={`${styles.arrowButton} ${day === 1 ? styles.disabled : ""}`}
        disabled={day === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <span
        className={`${styles.dayNumber} ${
          day === currentDay ? styles.currentDay : ""
        }`}
      >
        Jour {day}
      </span>
      <Button
        onClick={handleNextDay}
        className={`${styles.arrowButton} ${
          day === duration ? styles.disabled : ""
        }`}
        disabled={day === duration}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
};
