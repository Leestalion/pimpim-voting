// Trip.tsx
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Trip.module.css";

export const Trip = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={styles.tripPage}>
      {/* Header and menu toggle */}
      <header className={styles.tripHeader}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <h2>Vote Pimpim</h2>
      </header>

      {/* Sidebar for desktop */}
      <nav
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="results">Results</Link>
          </li>
          <li>
            <Link to="vote">Voting</Link>
          </li>
          <li>
            <Link to="users">User Management</Link>
          </li>
        </ul>
      </nav>

      {/* Hamburger Menu for Mobile */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul>
          <li>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to="/">
                Home
              </Link>
            </li>
            <Link to="results" onClick={() => setIsMenuOpen(false)}>
              Results
            </Link>
          </li>
          <li>
            <Link to="vote" onClick={() => setIsMenuOpen(false)}>
              Voting
            </Link>
          </li>
          <li>
            <Link to="users" onClick={() => setIsMenuOpen(false)}>
              User Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Content for the selected route (Results, Voting, User Management) */}
      <section className={styles.tripContent}>
        <Outlet />
      </section>
    </div>
  );
};
