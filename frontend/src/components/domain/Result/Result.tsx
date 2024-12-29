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
      const calculatedDuration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDuration(calculatedDuration);
    }
  }, [trip.startDate, trip.endDate]);

  useEffect(() => {
    if (votes.length > 0 && users.length > 0 && currentDay) {
      setVotedUsers(calculateVotedUsers(votes, users));
      setVotedUsersDay(calculateVotedUsersForDay(votes, users, currentDay));
    }
    setIsReady(!!currentDay);
  }, [votes, users, currentDay]);

  const renderVoteButton = () => (
    <div className={styles.buttonContainer}>
      <Button
        className={styles.goToVoteButton}
        onClick={() => navigate(`/trip/${trip.id}/vote`)}
      >
        Voter
      </Button>
    </div>
  );

  const renderResults = () => (
    <>
      <ResultCard
        title={'Résultats par jour'}
        votedUsers={votedUsersDay}
        currentDay={currentDay}
        duration={duration}
        setResultDay={handleSetResultDay}
      />
      <ResultCard title={'Résultats globaux'} votedUsers={votedUsers} />
    </>
  );

  if (!isReady || currentDay === 0 || duration === 0) {
    return <LoadingComponent />;
  }

  if (currentDay > duration) {
    return (
      <div>
        <div className={styles.emptyResult}>
          Le voyage est terminé, merci d'avoir voté !
        </div>
        {renderResults()}
      </div>
    );
  }

  if (votedUsers.length === 0) {
    return (
      <div>
        {renderVoteButton()}
        <CountDown />
        <div className={styles.emptyResult}>Pas encore de vote</div>
      </div>
    );
  }

  return (
    <div>
      {renderVoteButton()}
      <CountDown />
      {renderResults()}
    </div>
  );
};
