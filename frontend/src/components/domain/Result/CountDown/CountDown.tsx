import { useEffect, useState } from "react";
import styles from "./CountDown.module.css";

export const CountDown = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const closingTime = new Date();
      closingTime.setHours(23, 0, 0, 0); // Set to 23:00:00 today

      const diff = closingTime.getTime() - now.getTime(); // Milliseconds until 23:00
      if (diff <= 0) {
        setTimeRemaining("Voting is now closed.");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className={styles.countdown}>
      <p>Temps restant pour voter: {timeRemaining}</p>
    </div>
  );
};
