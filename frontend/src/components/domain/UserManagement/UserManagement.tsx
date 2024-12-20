import { useState, useEffect, FormEvent } from "react";
import { useTrip } from "src/hooks";
import { UserManagementUI } from "src/components/ui";

export const UserManagement = () => {
  const { users, fetchUsers, addUser, editUser, deleteUser } = useTrip();

  const [username, setUsername] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  // Logic for managing users
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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Populate props for the UI component
  return (
    <UserManagementUI
      users={users}
      username={username}
      setUsername={setUsername}
      securityCode={securityCode}
      setSecurityCode={setSecurityCode}
      editingUserId={editingUserId}
      isModalOpen={isModalOpen}
      handleSave={handleSave}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleAddUser={handleAddUser}
      handleDelete={handleDelete}
      handleConfirmDelete={handleConfirmDelete}
      handleModalClose={handleModalClose}
    />
  );
};
