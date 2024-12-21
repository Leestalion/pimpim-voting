import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "src/hooks";
import { TripCreationUI } from "src/components/ui";

export const TripCreation = () => {
  const [name, setName] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const { createTrip } = useTrips();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Les dates de début et de fin sont obligatoires !");
      return;
    }
  
    if (new Date(startDate) > new Date(endDate)) {
      alert("La date de fin doit être postérieure à la date de début !");
      return;
    }

    createTrip({ name, securityCode, startDate, endDate });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <TripCreationUI
      name={name}
      securityCode={securityCode}
      startDate={startDate}
      endDate={endDate}
      onNameChange={setName}
      onSecurityCodeChange={setSecurityCode}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
};
