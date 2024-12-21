import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTrip } from "src/hooks";
import { ResultCard } from "src/components/ui";
import styles from "./Result.module.css";
import { VotedUser } from "src/types";
import { calculateVotedUsers, calculateVotedUsersForDay } from "./score";
import { CountDown } from "./CountDown";

export const Result = () => {
  const navigate = useNavigate();
  const {
    votes,
    fetchVotes,
    users,
    fetchUsers,
    trip,
    currentDay,
    fetchCurrentDay,
  } = useTrip();

  const [votedUsers, setVotedUsers] = useState<VotedUser[]>([]);
  const [votedUsersDay, setVotedUsersDay] = useState<VotedUser[]>([]);
  const [duration, setDuration] = useState<number>(0);

  const handleSetResultDay = (day: number) => {
    const votedUsersDay = calculateVotedUsersForDay(votes, users, day);
    setVotedUsersDay(votedUsersDay);
  };

  useEffect(() => {
    fetchVotes();
    fetchUsers();
    fetchCurrentDay();
  }, [fetchVotes, fetchUsers, fetchCurrentDay]);

  useEffect(() => {
    if (trip.startDate && trip.endDate) {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setDuration(duration);
    }
  }, [trip.startDate, trip.endDate]);

  useEffect(() => {
    if (votes.length > 0 && users.length > 0) {
      const computedVotedUsers = calculateVotedUsers(votes, users);
      setVotedUsers(computedVotedUsers);

      if (currentDay) {
        const computedVotedUsersDay = calculateVotedUsersForDay(votes, users, currentDay)
        setVotedUsersDay(computedVotedUsersDay);
      }
    }
  }, [votes, users, currentDay]);

  return (
    <div>
      <button
        className={styles.goToVoteButton}
        onClick={() => navigate(`/trip/${trip.id}/vote`)}
      >
        Voter
      </button>

      <CountDown />

      <ResultCard
        votedUsers={votedUsersDay}
        currentDay={currentDay}
        duration={duration}
        setResultDay={handleSetResultDay}
      />

      <ResultCard votedUsers={votedUsers} />
    </div>
  );
};
