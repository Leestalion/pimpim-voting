import { PropsWithChildren, useState } from "react";
import { DeveloperContext } from "./DeveloperContext";
import { developerPasswordMatch } from "src/services/developerService";
import { toast } from "react-toastify";

export const DeveloperProvider = ({ children }: PropsWithChildren) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false); 

  const toggleDeveloperMode = async (password?: string) => {
    if (!isDeveloperMode && password) {
      try {
        const success = await developerPasswordMatch(password);
        if (!success) {
          toast.error("Mot de passe incorrect");

        } else {
          setIsDeveloperMode(true);
          toast.success("Mode développeur activé");
        }
      } catch (error) {
        console.error(error);
        return;
      }
    } else if(isDeveloperMode) {
      setIsDeveloperMode(!isDeveloperMode);
    } else {
      throw new Error("Mot de passe requis pour activer le mode développeur");
    }
  };

  return (
    <DeveloperContext.Provider value={{ isDeveloperMode, toggleDeveloperMode }}>
      {children}
    </DeveloperContext.Provider>
  );
};
