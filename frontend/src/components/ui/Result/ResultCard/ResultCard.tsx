import { useCallback, useEffect, useRef, useState } from "react";
import { VotedUser } from "src/types";
import styles from "./ResultCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface ResultCardProps {
  votedUsers: VotedUser[];
}

export const ResultCard = ({ votedUsers }: ResultCardProps) => {
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

  useEffect(() => {
    calculateHeight(); // Initial calculation
    window.addEventListener("resize", calculateHeight); // Recalculate on window resize
    return () => window.removeEventListener("resize", calculateHeight); // Clean up on unmount
  }, [calculateHeight]);

  useEffect(() => {
    const sorted = votedUsers.sort((a, b) => b.score - a.score);
    setSortedVotedUsers(sorted);
  }, [showAll, votedUsers]);

  return (
    <div className={styles.resultCard}>
      <ul
        ref={listRef}
        className={styles.userList}
        style={{ maxHeight: showAll ? `${listHeight}px` : "220px" }}
      >
        {sortedVotedUsers.map((votedUser) => {
          return (
            <li key={votedUser.userId} className={styles.userItem}>
              <p>{votedUser.username}</p>
              <p>{votedUser.score}</p>
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
