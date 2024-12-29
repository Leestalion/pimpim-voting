import { useEffect, useState } from "react";
import { User } from "src/types";
import styles from "./UserSelectionModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "src/components/ui";

interface UserSelectionModalProps {
  isOpen: boolean;
  users: User[];
  selectedUsers: User[];
  onClose: () => void;
  onValidate: (users: User[]) => void;
}

export const UserSelectionModal = ({
  isOpen,
  users,
  selectedUsers,
  onClose,
  onValidate,
}: UserSelectionModalProps) => {
  const [selected, setSelected] = useState(selectedUsers);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleUserSelection = (user: User) => {
    if (selected.find((u) => u.id === user.id)) {
      // Remove user if already selected
      setSelected(selected.filter((u) => u.id !== user.id));
    } else {
      // Add user if not selected
      setSelected([...selected, user]);
    }
  };

  const handleValidate = () => {
    onValidate(selected);
  };

  const handleSelectAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Choisissez pour qui voter</h2>
        <Button
          className={styles.selectAllButton}
          onClick={handleSelectAll}
        >
          <FontAwesomeIcon icon={faCheck} className={styles.iconGreen} />
        </Button>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <Button
                className={`${styles.userButton} ${
                  selected.some((u) => u.id === user.id)
                    ? styles.selected
                    : styles.disabled
                }`}
                onClick={() => toggleUserSelection(user)}
              >
                <FontAwesomeIcon
                  icon={
                    selected.some((u) => u.id === user.id) ? faCheck : faXmark
                  }
                  className={`${styles.userIcon} ${
                    selected.some((u) => u.id === user.id)
                      ? styles.iconGreen
                      : styles.iconRed
                  }`}
                />
                {user.username}
              </Button>
            </li>
          ))}
        </ul>
        <div className={styles.modalButtons}>
          <Button className={styles.modalButton} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className={styles.iconRed} />
          </Button>
          <Button className={styles.modalButton} onClick={handleValidate}>
            <FontAwesomeIcon icon={faCheck} className={styles.iconGreen} />
          </Button>
        </div>
      </div>
    </div>
  );
};
