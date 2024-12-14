import { useState } from "react";
import styles from "./UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

interface EditableFieldProps {
  label: string;
  initialValue: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  initialValue,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [tempValue, setTempValue] = useState(initialValue);

  const handleSave = () => {
    if (tempValue.trim() === "") {
      alert(`Veuillez entrer un ${label}`);
      return;
    }
    onSave(tempValue);
  };

  return (
    <>
      {isEditing ? (
        <div className={styles.userButton}>
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            autoFocus
          />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconGreen}`} icon={faCheck} onClick={handleSave} />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconRed}`} icon={faXmark} onClick={onCancel} />
        </div>
      ) : (
        <button onClick={onEdit} className={styles.userButton}>{initialValue}</button>
      )}
    </>
  );
};