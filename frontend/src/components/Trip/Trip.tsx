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
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Icônes
import { useTrip } from "src/hooks";
import { EditableField } from "./UserManagement/EditableField";
import { ConfirmationModal } from "src/components/Modal";

export const Trip = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { editTrip, deleteTrip, trip } = useTrip();

  const [isEditingTripName, setIsEditingTripName] = useState(false);
  const [tempTripName, setTempTripName] = useState(trip.name);
  const [isTripEditModalOpen, setIsTripEditModalOpen] = useState(false);
  const [isTripDeleteModalOpen, setIsTripDeleteModalOpen] = useState(false);

  const menuItems = [
    { to: "/", icon: faHome, label: "Accueil", onClick: () => setIsMenuOpen(false)},
    { to: "results", icon: faChartBar, label: "Résultats", onClick: () => setIsMenuOpen(false) },
    { to: "vote", icon: faVoteYea, label: "Vote", onClick: () => setIsMenuOpen(false) },
    { to: "users", icon: faUsers, label: "Gestion des utilisateurs", onClick: () => setIsMenuOpen(false) },
    { to: "", icon: faTrash, label: "Supprimer le voyage", onClick: () => {setIsMenuOpen(false); setIsTripDeleteModalOpen(true)}  },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleEditTripName = (newTripName: string) => {
    // Add your save logic here
    setTempTripName(newTripName);
    setIsTripEditModalOpen(true);
  };

  const handleCancelEditTripName = () => {
    setTempTripName(trip.name);
    setIsEditingTripName(false);
  };

  const handleTripConfirmEdit = (secretCode: string) => {
    editTrip(tempTripName, secretCode);
    setIsEditingTripName(false);
    setIsTripEditModalOpen(false);
  };

  const handleTripConfirmDelete = (secretCode: string) => {
    deleteTrip(secretCode);
    setIsTripDeleteModalOpen(false);
  }

  return (
    <div className={styles.tripPage}>
      <ConfirmationModal
        isOpen={isTripEditModalOpen}
        onClose={() => setIsTripEditModalOpen(false)}
        onConfirm={handleTripConfirmEdit}
      />
      <ConfirmationModal
        isOpen={isTripDeleteModalOpen}
        onClose={() => setIsTripDeleteModalOpen(false)}
        onConfirm={handleTripConfirmDelete}
      />
      {/* En-tête et bascule du menu */}
      <header className={styles.tripHeader}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          &#9776; {/* Icône hamburger */}
        </button>
        <div className={styles.tripName}>
          {isEditingTripName ? (
            <EditableField
              label="Nom du voyage"
              initialValue={tempTripName}
              isEditing={isEditingTripName}
              onEdit={() => setIsEditingTripName(true)}
              onSave={(newTripName) => handleEditTripName(newTripName)}
              onCancel={handleCancelEditTripName}
            />
          ) : (
            <>
              <h2 className={styles.tripNameTitle}>{trip.name}</h2>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.icon}
                onClick={() => setIsEditingTripName(true)}
              />
            </>
          )}
        </div>
      </header>

      {/* Barre latérale pour bureau */}
      <nav
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
      >
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link to={item.to} onClick={item.onClick}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu hamburger pour mobile */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link onClick={item.onClick} to={item.to}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenu pour la route sélectionnée (Résultats, Vote, Gestion des utilisateurs) */}
      <section className={styles.tripContent}>
        <Outlet />
      </section>
    </div>
  );
};
