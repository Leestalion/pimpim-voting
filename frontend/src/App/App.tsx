import { Outlet } from "react-router-dom";
import "./App.css";
import styles from "./App.module.css";
import { TripsProvider } from "src/contexts";

export function App() {
  return (
    <TripsProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Vote Pimpim</h1>
        </header>

        {/* The main content section where Trip page will render */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </TripsProvider>
  );
}
