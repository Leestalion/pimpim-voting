// src/components/ui/TripHeader.tsx
import { Button, EditableField } from "src/components/ui";
import styles from "./TripHeader.module.css";
import { useState } from "react";
import { useDeveloper } from "src/hooks";

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
  const { isDeveloperMode } = useDeveloper();

  return (
    <header className={styles.tripHeader}>
      <Button className={styles.hamburger} onClick={onToggleMenu}>
        &#9776;
      </Button>

      {isDeveloperMode ? (
        <div className={styles.tripTitleModifiable}>
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
      ) : (
        <h1 className={styles.tripTitle}>{tripName}</h1>
      )}
    </header>
  );
};
