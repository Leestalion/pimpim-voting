import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import styles from "./App.module.css";
import { useDeveloper } from "src/hooks";
import { TripsProvider } from "src/contexts";
import { ConfirmationModal } from "src/components/ui";

export function App() {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloper();
  const [openModal, setOpenModal] = useState(false);

  const handleOnConfirm = (password?: string) => {
    toggleDeveloperMode(password);
    setOpenModal(false);
  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <TripsProvider>
      <ToastContainer theme="dark" position="top-right" autoClose={5000} />
      <ConfirmationModal
        onConfirm={handleOnConfirm}
        isOpen={openModal}
        onClose={handleOnClose}
        noPassword={isDeveloperMode}
      />
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Vote Pimpim</h1>
          {isDeveloperMode ? (
            <FontAwesomeIcon
              icon={faLockOpen}
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
