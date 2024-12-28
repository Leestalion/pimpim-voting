import { createContext } from "react";

export interface DeveloperContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: (password?: string) => void;
}

export const DeveloperContext = createContext<DeveloperContextType>({
  isDeveloperMode: false,
  toggleDeveloperMode: async () => {},
});
