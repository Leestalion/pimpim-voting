import { User } from "src/types";

interface VoteSummaryProps {
  votedUsers: User[];
  onModifyVote: () => void;
}

export const VoteSummary = ({ votedUsers, onModifyVote }: VoteSummaryProps) => {
  return (
    <div>
      <h2>Your Vote</h2>
      <ul>
        {votedUsers.map((user, index) => (
          <li key={user.id}>
            {index + 1}. {user.username}
          </li>
        ))}
      </ul>
      <button onClick={onModifyVote}>Modify Vote</button>
    </div>
  );
};
