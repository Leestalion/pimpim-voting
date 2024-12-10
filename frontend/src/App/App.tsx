import { Outlet } from "react-router-dom";

import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Vote Pimpim</h1>
      </header>

      {/* The main content section where Trip page will render */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}