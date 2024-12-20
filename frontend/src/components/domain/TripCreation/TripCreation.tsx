import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "src/hooks";
import { TripCreationUI } from "src/components/ui";

export const TripCreation = () => {
  const [name, setName] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const navigate = useNavigate();
  const { createTrip } = useTrips();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTrip({ name, securityCode });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <TripCreationUI
      name={name}
      securityCode={securityCode}
      onNameChange={setName}
      onSecurityCodeChange={setSecurityCode}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
};
