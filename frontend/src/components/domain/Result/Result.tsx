import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTrip } from "src/hooks";
import { Button, ResultCard } from "src/components/ui";
import styles from "./Result.module.css";
import { VotedUser } from "src/types";
import { calculateVotedUsers, calculateVotedUsersForDay } from "./score";
import { CountDown } from "./CountDown";
import LoadingComponent from "src/components/ui/Loading/LoadingComponent";

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
  const [isReady, setIsReady] = useState(false); // Track when data is ready

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
      const duration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDuration(duration);
    }
  }, [trip.startDate, trip.endDate]);

  useEffect(() => {
    if (votes.length > 0 && users.length > 0 && currentDay) {
      const computedVotedUsers = calculateVotedUsers(votes, users);
      setVotedUsers(computedVotedUsers);

      const computedVotedUsersDay = calculateVotedUsersForDay(
        votes,
        users,
        currentDay
      );
      setVotedUsersDay(computedVotedUsersDay);
    }
    setIsReady(currentDay !== undefined);
  }, [votes, users, currentDay]);

  if (!isReady) {
    // Show loading spinner or placeholder until data is ready
    return <LoadingComponent />;
  }

  if (isReady && votedUsers.length === 0) {
    return (
      <>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.goToVoteButton}
            onClick={() => navigate(`/trip/${trip.id}/vote`)}
          >
            Voter
          </Button>
        </div>
        <div className={styles.emptyResult}>No votes yet</div>
      </>
    )
  }

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.goToVoteButton}
          onClick={() => navigate(`/trip/${trip.id}/vote`)}
        >
          Voter
        </Button>
      </div>

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
