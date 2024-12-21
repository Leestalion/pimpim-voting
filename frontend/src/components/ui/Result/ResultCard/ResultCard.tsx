import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { VotedUser } from "src/types";
import styles from "./ResultCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { DaySelector } from "../DaySelector";

interface ResultCardProps {
  votedUsers: VotedUser[];
  currentDay?: number;
  duration?: number;
  setResultDay?: (day: number) => void;
}

export const ResultCard = ({ votedUsers, currentDay, duration, setResultDay }: ResultCardProps) => {
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
      {currentDay !== undefined && setResultDay && (
        <DaySelector currentDay={currentDay} setResultDay={setResultDay} duration={duration || 0} />
      )}
      <ul
        ref={listRef}
        className={styles.userList}
        style={{ maxHeight: showAll ? `${listHeight}px` : "220px" }}
      >
        {sortedVotedUsers.map((votedUser) => {
          return (
            <li key={votedUser.userId} className={styles.userItem}>
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
