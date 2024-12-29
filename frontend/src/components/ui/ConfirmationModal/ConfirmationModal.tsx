import { useEffect, useState } from "react";
import styles from "./ConfirmationModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (secretCode: string) => void;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  const [secretCode, setSecretCode] = useState("");

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

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(secretCode);
    setSecretCode("");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirmer</h2>
        <p>Veuillez entrer le code secret pour confirmer :</p>
        <form onSubmit={handleConfirm}>
          <input
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Code Secret"
            autoFocus
          />
          <div className={styles.modalButtons}>
            <Button type="button" className={styles.modalButton} onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} className={styles.iconRed} />
            </Button>
            <Button
              type="submit"
              className={styles.modalButton}
              disabled={!secretCode}
            >
              <FontAwesomeIcon icon={faCheck} className={styles.iconGreen} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
