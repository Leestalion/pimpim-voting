import { useState } from "react";
import { useTrip } from "src/hooks";
import { User, Vote as VoteType } from "src/types";
import { VotingUserSelector } from "src/components/ui";
import { VotingActions } from "./VotingActions";
import styles from "./Vote.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { VoteSummary } from "src/components/ui/Vote/VoteSummary";

export const Vote = () => {
  const { users, fetchUsers, fetchUserVotes } = useTrip();
  const [votingUser, setVotingUser] = useState<User | null>(null);
  const [votingUserVotes, setVotingUserVotes] = useState<VoteType[]>([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleVotingUserSelection = async (user: User) => {
    setSelectedUsers([]);
    setVotingUser(user);
    const votes = await fetchUserVotes(user);
    setVotingUserVotes(votes || []);
    setVoteSubmitted(votes && votes.length > 0);
  };

  const handleOnModifyVote = () => {
    setVoteSubmitted(false);
    const previousVotedUsers = votingUserVotes.map((vote) => {
      return (
        users.find((user) => user.id === vote.userId) || {
          id: vote.userId,
          username: "Unknown User",
        }
      );
    });
    setSelectedUsers(previousVotedUsers);
  };

  const setSummaryVotes = (votes: VoteType[]) => {
    setVotingUserVotes(votes);
    setVoteSubmitted(true);
  };

  if (!votingUser) {
    return (
      <VotingUserSelector
        users={users}
        fetchUsers={fetchUsers}
        onSelectUser={handleVotingUserSelection}
      />
    );
  }

  return (
    <div>
      <div className={styles.votingUser}>
        <h3>Utilisateur : {votingUser.username}</h3>
        <button
          onClick={() => setVotingUser(null)}
          className={styles.switchUserButton}
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </button>
      </div>
      {!voteSubmitted ? (
        <VotingActions
          votingUser={votingUser}
          setSummaryVotes={setSummaryVotes}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      ) : (
        <VoteSummary
          votes={votingUserVotes}
          onModifyVote={handleOnModifyVote}
        />
      )}
    </div>
  );
};
