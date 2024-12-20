import { useEffect } from "react";
import styles from "./VotingUserSelector.module.css";
import { User } from "src/types";

interface VotingUserSelectorProps {
  users: User[];
  fetchUsers: () => void;
  onSelectUser: (user: User) => void;
}

export const VotingUserSelector = ({
  users,
  fetchUsers,
  onSelectUser,
}: VotingUserSelectorProps) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1>Vous êtes ?</h1>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)} className={styles.userItem}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
