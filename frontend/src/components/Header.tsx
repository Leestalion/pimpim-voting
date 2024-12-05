import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/trip-creation'>Création d'aventure</Link></li>
        <li><Link to='/vote/1'>Vote</Link></li>
        <li><Link to='/results'>Résultats</Link></li>
        <li><Link to='/users'>Gestion Utilisateurs</Link></li>
        <li><Link to='/countdown'>Décompte</Link></li>
      </ul>
    </nav>
  );
};
