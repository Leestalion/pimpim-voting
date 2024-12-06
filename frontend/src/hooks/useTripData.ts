import { useContext } from "react"
import { TripContext, TripContextType } from "src/contexts"


// Custom hook to use the TripContext
export const useTripData = (): TripContextType => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error("useTripData must be used within a TripProvider");
    }
    return context;
};