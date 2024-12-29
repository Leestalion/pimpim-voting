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

export const VoteSummary = ({
  votes,
  onModifyVote,
  onDeleteVote,
}: VoteSummaryProps) => {
  const { users } = useTrip();

  const maxScorePerVoter = 10;

  const calculateScoresForVoter = (votes: Vote[]) => {
    const totalVotes = votes.length;

    const sortedVotes = votes.sort((a, b) => a.rank - b.rank);

    const rawWeights = sortedVotes.map(
      (_, index) => (totalVotes - index) / totalVotes
    );
    const totalWeight = rawWeights.reduce((acc, weight) => acc + weight, 0);

    const normalizedWeight = rawWeights.map((weight) => weight / totalWeight);

    return sortedVotes.map((vote, index) => ({
      userId: vote.userId,
      score: normalizedWeight[index] * maxScorePerVoter,
    }));
  };

  const scores = calculateScoresForVoter(votes);

  return (
    <div>
      <h2>Vous avez voté : </h2>
      <ul className={styles.votedUserList}>
        {votes
          .sort((a, b) => a.rank - b.rank)
          .map((vote, index) => {
            const username =
              users.find((user) => user.id === vote.userId)?.username ||
              "Unknown User";
            const score =
              scores.find((score) => score.userId === vote.userId)?.score || 0;
            return (
              <li key={vote.rank} className={styles.votedUser}>
                {index === 0 && (
                  <FontAwesomeIcon
                    icon={faCrown}
                    className={styles.goldCrown}
                  />
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
                <span className={styles.userLine}>
                  <span>{username}</span> <span>{score.toFixed(2)}</span>
                </span>
              </li>
            );
          })}
      </ul>
      <Button onClick={onModifyVote} className={styles.button}>
        Modifier <FontAwesomeIcon icon={faEdit} className={styles.buttonIcon} />
      </Button>
      <Button onClick={onDeleteVote} className={styles.button}>
        Supprimer{" "}
        <FontAwesomeIcon icon={faTrash} className={styles.buttonIcon} />
      </Button>
    </div>
  );
};
