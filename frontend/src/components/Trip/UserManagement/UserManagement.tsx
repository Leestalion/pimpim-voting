import { FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useTrip } from "src/hooks";
import styles from "./UserManagement.module.css";
import { EditableField } from "./EditableField";
import { ConfirmationModal } from "src/components/Modal";

export const UserManagement = () => {
  const { users, fetchUsers, addUser, editUser, deleteUser } = useTrip();
  const [username, setUsername] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const handleSave = (id: string, newUsername: string) => {
    editUser(id, newUsername);
    setEditingUserId(null);
  };

  const handleEdit = (id: string) => {
    setEditingUserId(id);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();

    if (!username) {
      alert("Veuillez entrer un nom d'utilisateur");
      return;
    }

    if (!securityCode) {
      alert("Veuillez entrer un code de sécurité");
      return;
    }

    if (users.some((user) => user.username === username)) {
      alert("L'utilisateur existe déjà");
      return;
    }

    addUser(username, securityCode);
    setUsername("");
  };

  const handleDelete = (id: string) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = (secretCode: string) => {
    if (userIdToDelete) {
      deleteUser(userIdToDelete, secretCode);
      setUserIdToDelete(null);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
        <button type="submit">Ajouter un utilisateur</button>
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
