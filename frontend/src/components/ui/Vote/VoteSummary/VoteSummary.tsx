import { Vote } from "src/types";
import styles from "./VoteSummary.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTrip } from "src/hooks";
import { Button } from "src/components/ui";

interface VoteSummaryProps {
  votes: Vote[];
  onModifyVote: () => void;
  onDeleteVote: () => void;
}

export const VoteSummary = ({ votes, onModifyVote, onDeleteVote }: VoteSummaryProps) => {
  const { users } = useTrip();

  return (
    <div>
      <h2>Vous avez voté : </h2>
      <ul className={styles.votedUserList}>
        {votes
          .sort((a, b) => a.rank - b.rank)
          .map((vote, index) => (
            <li key={vote.rank} className={styles.votedUser}>
              {index === 0 && (
                <FontAwesomeIcon icon={faCrown} className={styles.goldCrown} />
              )}
              {index === 1 && (
                <FontAwesomeIcon
                  icon={faCrown}
                  className={styles.silverCrown}
                />
              )}
              {index === 2 && (
                <FontAwesomeIcon
                  icon={faCrown}
                  className={styles.copperCrown}
                />
              )}
              {index >= 3 && index + 1 + "."}{" "}
              {users.find((user) => user.id === vote.userId)?.username ||
                "Unknown User"}
            </li>
          ))}
      </ul>
      <Button onClick={onModifyVote} className={styles.button}>
        Modifier <FontAwesomeIcon icon={faEdit} className={styles.buttonIcon} />
      </Button>
      <Button onClick={onDeleteVote} className={styles.button}>
        Supprimer <FontAwesomeIcon icon={faTrash} className={styles.buttonIcon} />
      </Button>
    </div>
  );
};
