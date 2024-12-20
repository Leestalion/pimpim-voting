import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTrip } from "src/hooks";
import { ResultCard } from 'src/components/ui';
import styles from "./Result.module.css";
import { VotedUser } from "src/types";
import { calculateVotedUsers } from "./score";

export const Result = () => {
  const navigate = useNavigate();
  const { votes, fetchVotes, users, fetchUsers, trip } = useTrip();

  const [votedUsers, setVotedUsers] = useState<VotedUser[]>([]);

  useEffect(() => {
    fetchVotes();
    fetchUsers();
  }, [fetchVotes, fetchUsers]);

  useEffect(() => {
    if(votes.length > 0 && users.length > 0) {

      const computedVotedUsers = calculateVotedUsers(votes, users);
      setVotedUsers(computedVotedUsers);
    }
  }, [votes, users]);

  return (
    <div>
      <button className={styles.goToVoteButton} onClick={() => navigate(`/trip/${trip.id}/vote`)}>Voter</button>
      <h3>Results Section</h3>

      <ResultCard votedUsers={votedUsers} />

    </div>
  );
};
