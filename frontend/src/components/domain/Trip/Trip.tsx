// src/domain/Trip/Trip.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTrip } from "src/hooks";
import { TripHeader } from "src/components/ui";
import { Sidebar } from "src/components/ui";
import { ConfirmationModal } from "src/components/ui";
import styles from "./Trip.module.css";

export const Trip = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTripEditModalOpen, setIsTripEditModalOpen] = useState(false);
  const [isTripDeleteModalOpen, setIsTripDeleteModalOpen] = useState(false);
  const { trip, editTrip, deleteTrip } = useTrip();
  const [tempTripName, setTempTripName] = useState(trip.name);

  const handleEditTrip = (newTripName: string) => {
    setTempTripName(newTripName);
    setIsTripEditModalOpen(true);
  };

  const handleConfirmEdit = (secretCode: string) => {
    editTrip(tempTripName, secretCode);
    setIsTripEditModalOpen(false);
  };

  const handleConfirmDelete = (secretCode: string) => {
    deleteTrip(secretCode);
    setIsTripDeleteModalOpen(false);
  };

  return (
    <div className={styles.tripPage}>
      <ConfirmationModal
        isOpen={isTripEditModalOpen}
        onClose={() => setIsTripEditModalOpen(false)}
        onConfirm={handleConfirmEdit}
      />
      <ConfirmationModal
        isOpen={isTripDeleteModalOpen}
        onClose={() => setIsTripDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <TripHeader
        tripName={trip.name}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onEditTripName={handleEditTrip}
      />
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onDelete={() => setIsTripDeleteModalOpen(true)}
      />
      <main className={styles.tripContent}>
        <Outlet />
      </main>
    </div>
  );
};
