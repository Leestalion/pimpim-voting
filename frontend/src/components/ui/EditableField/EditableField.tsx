import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./EditableField.module.css";
import { Button } from "../Button";

interface EditableFieldProps {
  label: string;
  initialValue: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (newValue: string) => void;
  onCancel: () => void;
  isTitle?: boolean;
}

export const EditableField = ({
  label,
  initialValue,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isTitle = false,
}: EditableFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim() === "") {
      alert(`Veuillez entrer un ${label}`);
      return;
    }
    onSave(value);
  };

  const titleClass = isTitle ? styles.title : "";

  return (
    <>
      {isEditing ? (
        <div className={styles.userButton}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconGreen}`} icon={faCheck} onClick={handleSave} />
          <FontAwesomeIcon className={`${styles.icon} ${styles.iconRed}`} icon={faXmark} onClick={onCancel} />
        </div>
      ) : (
        <Button onClick={onEdit} className={`${styles.userButton} ${titleClass}`}>{initialValue}</Button>
      )}
    </>
  );
};