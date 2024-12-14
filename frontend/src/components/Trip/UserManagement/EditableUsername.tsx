import { useState } from "react";
import styles from "./UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

interface EditableUsernameProps {
  initialUsername: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (newUsername: string) => void;
  onCancel: () => void;
}

export const EditableUsername: React.FC<EditableUsernameProps> = ({
  initialUsername,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [ tempName, setTempName ] = useState(initialUsername);

  const handleSave = () => {
    if (tempName.trim() === "") {
      alert("Veuillez entrer un nom d'utilisateur");
      return;
    }
    onSave(tempName);
  };

  return (
    <>
      {isEditing ? (
        <div className={styles.userButton}>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            autoFocus
          />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconGreen}`} icon={faCheck} onClick={handleSave} />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconRed}`} icon={faXmark} onClick={onCancel} />
        </div>
      ) : (
        <>
          <button onClick={onEdit} className={styles.userButton}>{initialUsername}</button>
        </>
      )}
    </>
  )
};