import { User } from "src/types";
import styles from "./VoteSummary.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faEdit } from "@fortawesome/free-solid-svg-icons";

interface VoteSummaryProps {
  votedUsers: User[];
  onModifyVote: () => void;
}

export const VoteSummary = ({ votedUsers, onModifyVote }: VoteSummaryProps) => {
  return (
    <div>
      <h2>Vous avez voté : </h2>
      <ul className={styles.votedUserList}>
        {votedUsers.map((user, index) => (
          <li key={user.id} className={styles.votedUser}>
            
            {index === 0 && (
              <FontAwesomeIcon icon={faCrown} className={styles.goldCrown} />
            )}
            {index === 1 && (
              <FontAwesomeIcon icon={faCrown} className={styles.silverCrown} />
            )}
            {index === 2 && (
              <FontAwesomeIcon icon={faCrown} className={styles.copperCrown} />
            )}
            {index >= 3 && (index + ".")} {user.username}
          </li>
        ))}
      </ul>
      <button onClick={onModifyVote} >Modifier <FontAwesomeIcon icon={faEdit} className={styles.editButton} /></button>
    </div>
  );
};
