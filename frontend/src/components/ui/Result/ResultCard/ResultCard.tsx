import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { VotedUser } from "src/types";
import styles from "./ResultCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCrown } from "@fortawesome/free-solid-svg-icons";
import { DaySelector } from "../DaySelector";

interface ResultCardProps {
  votedUsers: VotedUser[];
  title: string;
  currentDay?: number;
  duration?: number;
  setResultDay?: (day: number) => void;
}

export const ResultCard = ({ votedUsers, title, currentDay = 0, duration, setResultDay }: ResultCardProps) => {
  const [showAll, setShowAll] = useState(false);
  const [sortedVotedUsers, setSortedVotedUsers] = useState<VotedUser[]>([]);

  const listRef = useRef<HTMLUListElement | null>(null);
  const [listHeight, setListHeight] = useState(0);

  // Function to update the height of the list dynamically
  const calculateHeight = useCallback(() => {
    if (listRef.current) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    calculateHeight();
  }, [calculateHeight, sortedVotedUsers]);

  useLayoutEffect(() => {
    const sorted = [...votedUsers].sort((a, b) => b.score - a.score);
    setSortedVotedUsers(sorted);
  }, [votedUsers]);

  useLayoutEffect(() => {
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardTitle}>
        <h2>{title}</h2>
      </div>
      {currentDay > 0 && setResultDay && (
        <DaySelector currentDay={currentDay} setResultDay={setResultDay} duration={duration || 0} />
      )}
      <ul
        ref={listRef}
        className={styles.userList}
        style={{ maxHeight: showAll ? `${listHeight}px` : "130px" }}
      >
        {sortedVotedUsers.map((votedUser, index) => {
          return (
            <li key={votedUser.userId} className={styles.userItem}>
            {index === 0 && (
              <FontAwesomeIcon icon={faCrown} className={styles.goldCrown} />
            )}
            {index === 1 && (
              <FontAwesomeIcon icon={faCrown} className={styles.silverCrown} />
            )}
            {index === 2 && (
              <FontAwesomeIcon icon={faCrown} className={styles.copperCrown} />
            )}
            <p>{votedUser.username}</p>
            <p>{Math.round(votedUser.score)}</p>
          </li>
          );
        })}
      </ul>
      <div className={styles.buttonContainer}>
        {showAll ? (
          <div onClick={() => setShowAll(false)} className={styles.showButton}>
            <FontAwesomeIcon icon={faChevronUp} />
            Voir Moins
          </div>
        ) : (
          <div onClick={() => setShowAll(true)} className={styles.showButton}>
            <FontAwesomeIcon icon={faChevronDown} />
            Voir Plus
          </div>
        )}
      </div>
    </div>
  );
};