// src/components/ui/TripHeader.tsx
import { EditableField } from "src/components/ui";
import styles from "./TripHeader.module.css";
import { useState } from "react";

interface TripHeaderProps {
  tripName: string;
  onToggleMenu: () => void;
  onEditTripName: (newTripName: string) => void;
}

export const TripHeader = ({
  tripName,
  onToggleMenu,
  onEditTripName,
}: TripHeaderProps) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <header className={styles.tripHeader}>
      <button className={styles.hamburger} onClick={onToggleMenu}>
        &#9776;
      </button>
      <div className={styles.tripName}>
        <EditableField
          label="Nom du voyage"
          initialValue={tripName}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={() => onEditTripName(tripName)}
          onCancel={() => setIsEditing(false)}
          isTitle={true}
        />
      </div>
    </header>
  );
};
