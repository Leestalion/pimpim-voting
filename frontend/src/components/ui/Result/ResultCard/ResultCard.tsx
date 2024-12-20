import { useEffect, useState } from "react";
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

  useEffect(() => {
    const sorted = votedUsers.sort((a, b) => b.score - a.score)
    const displayed = showAll ? sorted : sorted.slice(0, 3);
    setSortedVotedUsers(displayed);
  }, [showAll, votedUsers]);


  return (
    <div className={styles.resultCard}>
      <ul className={styles.userList}>
        {sortedVotedUsers.map((votedUser) => {
          return (
            <li key={votedUser.userId} className={styles.userItem}>
              <p>{votedUser.username}</p><p>{votedUser.score}</p>
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
