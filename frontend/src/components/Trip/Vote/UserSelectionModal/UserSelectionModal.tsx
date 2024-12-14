import { useState } from 'react';
import { User } from 'src/types';
import styles from './UserSelectionModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

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
    onValidate(selected); // Pass selected users to parent component
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Choisissez pour qui voter</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <label className={styles.userLabel}>
                <input
                  type="checkbox"
                  checked={selected.some((u) => u.id === user.id)}
                  onChange={() => toggleUserSelection(user)}
                  className={styles.userCheckbox}
                />{' '}
                {user.username}
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className={styles.iconRed} />
          </button>
          <button
            className={styles.modalButton}
            onClick={handleValidate}
          >
            <FontAwesomeIcon icon={faCheck} className={styles.iconGreen} />
          </button>
        </div>
      </div>
    </div>
  );
};
