import { useEffect, useState } from "react";
import { axiosInstance } from "../../services";

export const Results = () => {
  const [dayWinner, setDayWinner] = useState<string | null>(null);
  const [globalResults, setGlobalResults] = useState<Map<string, number>>(
    new Map()
  );
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    // Fetch results from the backend
    const fetchResults = async () => {
      try {
        const { data } = await axiosInstance.get("/trip/trip123/results");
        console.log(data);
        setGlobalResults(new Map(Object.entries(data.globalResults)));
        setDayWinner(data.dayWinner);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();

    // Setup countdown for the end of the voting (11 PM)
    const interval = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 0, 0, 0);
      const remainingTime = endOfDay.getTime() - now.getTime();
      setCountdown(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        // Update results at 11 PM (this would happen on the server)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Résultats</h1>
      <div>
        <h2>Résultats du jour</h2>
        {dayWinner ? (
          <p>Gagnant: {dayWinner}</p>
        ) : (
          <p>Le vote est encore en cours...</p>
        )}
      </div>
      <div>
        <h2>Résultats Globaux</h2>
        <ul>
          {[...globalResults].map(([username, score]) => (
            <li key={username}>
              {username} : {score}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Temps restant avant la fermeture des votes</h2>
        <p>{Math.floor(countdown / 1000)} secondes</p>
      </div>
    </div>
  );
};