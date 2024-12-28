import { PropsWithChildren, useState } from "react";
import { DeveloperContext } from "./DeveloperContext";
import { developerPasswordMatch } from "src/services/developerService";

export const DeveloperProvider = ({ children }: PropsWithChildren) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false); 

  const toggleDeveloperMode = async (password?: string) => {
    if (!isDeveloperMode && password) {
      try {
        const success = await developerPasswordMatch(password);
        if (!success) {
          console.log("Password incorrect");
        } else {
          setIsDeveloperMode(true);
        }
      } catch (error) {
        console.error(error);
        return;
      }
    } else if(isDeveloperMode) {
      setIsDeveloperMode(!isDeveloperMode);
    } else {
      throw new Error("Password required to enter developer mode");
    }
  };

  return (
    <DeveloperContext.Provider value={{ isDeveloperMode, toggleDeveloperMode }}>
      {children}
    </DeveloperContext.Provider>
  );
};
