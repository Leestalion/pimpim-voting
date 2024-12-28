import { useContext } from "react";
import { DeveloperContext, DeveloperContextType } from "src/contexts";

export const useDeveloper = (): DeveloperContextType => {
  const context = useContext(DeveloperContext);
  if (!context) {
    throw new Error("useDeveloper must be used within a DeveloperProvider");
  }
  return context;
};  
