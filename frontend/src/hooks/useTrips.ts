import { useContext } from "react"
import { TripsContext, TripsContextType } from "src/contexts"


// Custom hook to use the TripContext
export const useTrips = (): TripsContextType => {
    const context = useContext(TripsContext);
    if (!context) {
        throw new Error("useTrips must be used within a TripsProvider");
    }
    return context;
};