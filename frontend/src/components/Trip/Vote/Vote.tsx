import { useEffect, useState } from "react";

import { UserSelectionModal } from "./UserSelectionModal";
import { DraggableUserList } from "./DraggableUserList";
import { VoteSummary } from "./VoteSummary";
import { useTrip } from "src/hooks";
import { User } from "src/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Vote.module.css";

export const Vote = () => {
  const { users, fetchUsers } = useTrip();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votingUser, setVotingUser] = useState<User | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
    closeModal();
  };

  const handleVoteSubmit = (orderedUsers: User[]) => {
    setSelectedUsers(orderedUsers);
    setVoteSubmitted(true);
  };

  const handleVotingUserSelection = (user: User) => {
    setVotingUser(user);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!votingUser) {
    return (
      <div>
        <h1>Vous êtes ?</h1>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleVotingUserSelection(user)} className={styles.userItem}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.votingUser}>
        <span>Utilisateur : {votingUser.username}</span>
        <button onClick={() => setVotingUser(null)} className={styles.switchUserButton}>
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </button>
      </div>
      {!voteSubmitted ? (
        <>
          <div className={styles.header}>
            <h1>Voter pour : </h1>
            <button onClick={openModal} className={styles.addUsersButton}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
          <UserSelectionModal
            isOpen={isModalOpen}
            users={users}
            selectedUsers={selectedUsers}
            onClose={closeModal}
            onValidate={handleUserSelection}
          />
          <DraggableUserList users={selectedUsers} onSubmitVote={handleVoteSubmit} />
        </>
      ) : (
        <VoteSummary votedUsers={selectedUsers} onModifyVote={() => setVoteSubmitted(false)} />
      )}
    </div>
  );
};
