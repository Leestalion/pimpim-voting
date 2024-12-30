import { useEffect, useState } from "react";
import styles from "./CountDown.module.css";

export const CountDown = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Determine the current voting window
      const openingTime = new Date();
      openingTime.setHours(6, 0, 0, 0); // Set to 06:00:00 today

      const closingTime = new Date();
      if (now.getHours() < 6) {
        // Before 6 AM, set closing time to 5 AM of the current day
        closingTime.setHours(5, 0, 0, 0); // Set to 05:00:00 today
      } else {
        // After 6 AM, set closing time to 5 AM of the next day
        closingTime.setDate(closingTime.getDate() + 1); // Move to next day
        closingTime.setHours(5, 0, 0, 0); // Set to 05:00:00 next day
      }

      const diff = closingTime.getTime() - now.getTime(); // Milliseconds until closing time
      if (diff <= 0 || (now.getHours() >= 5 && now.getHours() < 6)) {
        setTimeRemaining("Le vote est actuellement fermé.");
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
