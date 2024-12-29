// src/components/ui/Sidebar.tsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faVoteYea,
  faUsers,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { useDeveloper } from "src/hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const Sidebar = ({ isOpen, onClose, onDelete }: SidebarProps) => {
  const menuItems = [
    { to: "/", icon: faHome, label: "Accueil" },
    { to: "results", icon: faChartBar, label: "Résultats" },
    { to: "vote", icon: faVoteYea, label: "Vote" },
  ];

  const { isDeveloperMode } = useDeveloper();

  if (isDeveloperMode) {
    menuItems.push({ to: "users", icon: faUsers, label: "Gestion des utilisateurs" },);
  }



  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <ul className={styles.sidebarList}>
        {menuItems.map((item) => (
          <li key={item.to} className={styles.sidebarItem}>
            <Link to={item.to} onClick={onClose} className={styles.sidebarLink}>
              <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              {item.label}
            </Link>
          </li>
        ))}
        {isDeveloperMode && (
          <li className={styles.sidebarItem}>
            <div onClick={onDelete} className={styles.sidebarLink}>
              <FontAwesomeIcon icon={faTrash} className={styles.icon} />
              Supprimer le voyage
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};
