import { Outlet } from "react-router-dom";
import "./App.css";
import styles from "./App.module.css";
import { TripsProvider } from "src/contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { useDeveloper } from "src/hooks";
import { ConfirmationModal } from "src/components/ui";
import { useState } from "react";

export function App() {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloper();
  const [openModal, setOpenModal] = useState(false);

  const handleOnConfirm = (password: string) => {
    toggleDeveloperMode(password);
    setOpenModal(false);
  };

  const handleOnClose = () => {
    console.log(isDeveloperMode);
    setOpenModal(false);
  };

  return (
    <TripsProvider>
      <ConfirmationModal
        onConfirm={handleOnConfirm}
        isOpen={openModal}
        onClose={handleOnClose}
      />
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Vote Pimpim</h1>
          {isDeveloperMode ? (
            <FontAwesomeIcon
              icon={faUnlock}
              className={styles.developerIcon}
              onClick={() => setOpenModal(true)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faLock}
              className={styles.developerIcon}
              onClick={() => setOpenModal(true)}
            />
          )}
        </header>

        {/* The main content section where Trip page will render */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </TripsProvider>
  );
}
