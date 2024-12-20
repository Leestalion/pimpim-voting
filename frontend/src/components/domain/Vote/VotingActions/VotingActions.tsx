import { useState } from "react";
import { useTrip } from "src/hooks";
import { User, Vote } from "src/types";
import { VotingActionsUI } from "src/components/ui";

interface VotingActionsProps {
  votingUser: User;
  setSummaryVotes: (votes: Vote[]) => void;
}

export const VotingActions = ({ votingUser, setSummaryVotes }: VotingActionsProps) => {
  const { users, vote } = useTrip();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllUsersSelected, setIsAllUsersSelected] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
    setIsAllUsersSelected(false);
    closeModal();
  };

  const handleVoteSubmit = async (orderedUsers: User[]) => {
    const votes_data = orderedUsers.map((user, index) => ({
      userId: user.id,
      rank: index + 1,
      voterId: votingUser.id,
    }));
    const votes = await vote(votes_data);
    setSelectedUsers(orderedUsers);
    setVoteSubmitted(true);
    setSummaryVotes(votes);
  };

  const handleOnModifyVote = () => {
    setVoteSubmitted(false);
  };

  const handleSelectAllUsers = () => {
    setSelectedUsers(users);
    setIsAllUsersSelected(true);
    setVoteSubmitted(false);
  };

  const handleSelectSomeUsers = () => {
    setIsAllUsersSelected(false);
    openModal();
  };

  return (
    <VotingActionsUI
      users={users}
      selectedUsers={selectedUsers}
      voteSubmitted={voteSubmitted}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      handleUserSelection={handleUserSelection}
      handleVoteSubmit={handleVoteSubmit}
      handleOnModifyVote={handleOnModifyVote}
      isAllUsersSelected={isAllUsersSelected}
      onSelectAllUsers={handleSelectAllUsers}
      onSelectSomeUsers={handleSelectSomeUsers}
    />
  );
};
