import { useEffect, useState } from "react";
import { axiosInstance } from "../services";

export const VotingPage = ({ tripId }: { tripId: string }) => {
  const [users, setUsers] = useState<string[]>([]);
  const [vote, setVote] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get(`/trip/${tripId}/users`).then((response) => {
      setUsers(response.data); // Access the 'users' property from the response
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
    });
  }, [tripId]);

  const submitVote = async () => {
    if (!vote) {
      return;
    }
    await fetch(`/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tripId,
        usernmae: vote,
        date: new Date().toISOString().split("T")[0],
      }),
    });
  };

  return (
    <div>
      <h1>Votez pour le plus Pimpim !</h1>
      {users.map((user: string) => (
        <div key={user}>
          <input
            type="radio"
            name="vote"
            value={user}
            onChange={() => setVote(user)}
          />{" "}
          {user}
        </div>
      ))}
      <button onClick={submitVote}>Valider le Vote</button>
    </div>
  );
};