import { useState } from "react";
import { useTrip } from "src/hooks";
import { User, Vote as VoteType } from "src/types";
import { Button, ConfirmationModal, VotingUserSelector } from "src/components/ui";
import { VotingActions } from "./VotingActions";
import styles from "./Vote.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { VoteSummary } from "src/components/ui/Vote/VoteSummary";
import { toast } from "react-toastify";

export const Vote = () => {
  const { users, fetchUsers, fetchUserVotes, deleteUserVotes } = useTrip();
  const [votingUser, setVotingUser] = useState<User | null>(null);
  const [votingUserVotes, setVotingUserVotes] = useState<VoteType[]>([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isVotingAllowed = () => {
    const now = new Date();
    return !(now.getHours() === 23);
  };

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

  const handleOnDeleteVote = () => {
    setIsDeleteModalOpen(true);
  }

  const deleteVotes = () => {
    if (!votingUser) {
      toast.error("Impossible de supprimer les votes : utilisateur non trouvé");
      return;
    }
    setVotingUserVotes([]);
    setVoteSubmitted(false);
    deleteUserVotes(votingUser.id);
    setIsDeleteModalOpen(false);
  };

  const setSummaryVotes = (votes: VoteType[]) => {
    setVotingUserVotes(votes);
    setVoteSubmitted(true);
  };

  if (users.length === 0) {
    return <div className={styles.emptyResult}>Pas encore d'utilisateurs</div>;;
  }
  
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
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={deleteVotes}
        noPassword={true}
      />
      <div className={styles.votingUser}>
        <h3>Utilisateur : {votingUser.username}</h3>
        <Button
          onClick={() => setVotingUser(null)}
          className={styles.switchUserButton}
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </Button>
      </div>
      {!voteSubmitted ? (
        isVotingAllowed() ? (        
        <VotingActions
          votingUser={votingUser}
          setSummaryVotes={setSummaryVotes}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />) : ( 
          <p>Le vote est fermé entre 23h et minuit, Veuillez revenir plus tard!</p>
        )
      ) : (
        <VoteSummary
          votes={votingUserVotes}
          onModifyVote={handleOnModifyVote}
          onDeleteVote={handleOnDeleteVote}
        />
      )}
    </div>
  );
};
