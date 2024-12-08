import { FormEvent, useState } from "react";
import { useTrip } from "src/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./UserManagement.module.css";

export const UserManagement = () => {
  const { trip, addUser } = useTrip();
  const [username, setUsername] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();

    if (!username) {
      alert("Veuillez entrer un nom d'utilisateur");
    }

    if (!securityCode) {
      alert("Veuillez entrer un code de sécurité");
    }

    if (trip.users.includes(username)) {
      alert("L'utilisateur existe déjà");
    }

    if (trip.securityCode !== securityCode) {
      alert("Code de sécurité invalide");
    }

    addUser(username, securityCode);
    setUsername("");
  };

  return (
    <div>
      <h3>Gestion des utilisateurs</h3>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Entrez le nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entrez le code secret du voyage"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
        />
        <button type="submit">Ajouter un utilisateur</button>
      </form>

      <ul className={styles.userList}>
        {trip.users.map((user, index) => (
          <li key={index} className={styles.userListElement}>
            <button
              className={styles.userButton}
              onClick={() => console.log("modifier l'utilisateur")}
            >
              {user}{" "}
            </button>
            <FontAwesomeIcon
              className={styles.icon}
                onClick={(e) =>{e.stopPropagation(); console.log("supprimer l'utilisateur")}}
                icon={faTrash}
              />
          </li>
        ))}
      </ul>
    </div>
  );
};
