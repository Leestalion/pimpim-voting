import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditableField } from "../EditableField";
import { ConfirmationModal } from "src/components/ui/ConfirmationModal";
import styles from "./UserManagementUI.module.css";
import { Button } from "../Button";

interface UserManagementUIProps {
  users: Array<{ id: string; username: string }>;
  username: string;
  setUsername: (value: string) => void;
  securityCode: string;
  setSecurityCode: (value: string) => void;
  editingUserId: string | null;
  isModalOpen: boolean;
  handleSave: (id: string, newUsername: string) => void;
  handleEdit: (id: string) => void;
  handleCancel: () => void;
  handleAddUser: (e: React.FormEvent) => void;
  handleDelete: (id: string) => void;
  handleConfirmDelete: (secretCode: string) => void;
  handleModalClose: () => void;
}

export const UserManagementUI = ({
  users,
  username,
  setUsername,
  securityCode,
  setSecurityCode,
  editingUserId,
  isModalOpen,
  handleSave,
  handleEdit,
  handleCancel,
  handleAddUser,
  handleDelete,
  handleConfirmDelete,
  handleModalClose,
}: UserManagementUIProps) => {
  return (
    <div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
      />
      <h3>Gestion des utilisateurs</h3>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Entrez le nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entrez le code secret du voyage"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
        />
        <Button type="submit">Ajouter un utilisateur</Button>
      </form>

      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userListElement}>
            <EditableField
              label="nom d'utilisateur"
              initialValue={user.username}
              isEditing={editingUserId === user.id}
              onEdit={() => handleEdit(user.id)}
              onSave={(newUsername) => handleSave(user.id, newUsername)}
              onCancel={handleCancel}
            />
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.iconRed}`}
              icon={faTrash}
              onClick={() => handleDelete(user.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
