import { useState } from "react";

export  const TripCreation = () => {
  const [name, setName] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const createTrip = async () => {
    await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, securityCode }),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTrip();
      }}
    >
      <input
        type="text"
        placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Security Code"
        value={securityCode}
        onChange={(e) => setSecurityCode(e.target.value)}
      />
      <button type="submit">Create Trip</button>
    </form>
  );
};
