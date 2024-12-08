// Trip.tsx
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Trip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faVoteYea,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"; // Icônes
import { useTrip } from "src/hooks";

export const Trip = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trip } = useTrip();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={styles.tripPage}>
      {/* En-tête et bascule du menu */}
      <header className={styles.tripHeader}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          &#9776; {/* Icône hamburger */}
        </button>
        <h2>{ trip.name }</h2>
      </header>

      {/* Barre latérale pour bureau */}
      <nav
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
      >
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className={styles.icon} />
              Accueil
            </Link>
          </li>
          <li>
            <Link to="results">
              <FontAwesomeIcon icon={faChartBar} className={styles.icon} />
              Résultats
            </Link>
          </li>
          <li>
            <Link to="vote">
              <FontAwesomeIcon icon={faVoteYea} className={styles.icon} />
              Vote
            </Link>
          </li>
          <li>
            <Link to="users">
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
              Gestion des utilisateurs
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menu hamburger pour mobile */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul>
          <li>
            <Link onClick={() => setIsMenuOpen(false)} to="/">
              <FontAwesomeIcon icon={faHome} className={styles.icon} />
              Accueil
            </Link>
          </li>
          <li>
            <Link to="results" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faChartBar} className={styles.icon} />
              Résultats
            </Link>
          </li>
          <li>
            <Link to="vote" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faVoteYea} className={styles.icon} />
              Vote
            </Link>
          </li>
          <li>
            <Link to="users" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
              Gestion des utilisateurs
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenu pour la route sélectionnée (Résultats, Vote, Gestion des utilisateurs) */}
      <section className={styles.tripContent}>
        <Outlet />
      </section>
    </div>
  );
};
