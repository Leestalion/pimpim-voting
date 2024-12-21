import { User } from "src/types";
import { UserSelectionModal } from "../UserSelectionModal";
import { DraggableUserList } from "../DraggableUserList";
import styles from "./VotingActionsUI.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface VotingActionsUIProps {
  users: User[];
  selectedUsers: User[];
  voteSubmitted: boolean;
  isModalOpen: boolean;
  isAllUsersSelected: boolean;
  closeModal: () => void;
  handleUserSelection: (users: User[]) => void;
  handleVoteSubmit: (users: User[]) => void;
  onSelectAllUsers: () => void;
  onSelectSomeUsers: () => void;
}

export const VotingActionsUI: React.FC<VotingActionsUIProps> = ({
  users,
  selectedUsers,
  isModalOpen,
  isAllUsersSelected,
  closeModal,
  handleUserSelection,
  handleVoteSubmit,
  onSelectAllUsers,
  onSelectSomeUsers,
}) => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.voteForLabel}>Voter pour :</h1>
        <div className={styles.buttonGroup}>
          <button
            onClick={onSelectAllUsers}
            className={`${styles.allUsersButton} ${
              isAllUsersSelected ? "" : styles.notChosen
            }`}
          >
            Tous
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={
                isAllUsersSelected ? styles.selectedIcon : styles.unselectedIcon
              }
            />
          </button>
          <button
            onClick={onSelectSomeUsers}
            className={`${styles.chooseUsersButton} ${
              !isAllUsersSelected ? "" : styles.notChosen
            }`}
          >
            Choisir
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={
                !isAllUsersSelected
                  ? styles.selectedIcon
                  : styles.unselectedIcon
              }
            />
          </button>
        </div>
      </div>
      <UserSelectionModal
        isOpen={isModalOpen}
        users={users}
        selectedUsers={selectedUsers}
        onClose={closeModal}
        onValidate={handleUserSelection}
      />
      <DraggableUserList
        users={selectedUsers}
        onSubmitVote={handleVoteSubmit}
      />
    </div>
  );
};
