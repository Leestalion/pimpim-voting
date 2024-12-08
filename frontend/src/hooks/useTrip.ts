import { useContext } from "react";
import { TripContext, TripContextType } from "src/contexts";

export const useTrip = (): TripContextType => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error("useTrip must be used within a TripProvider");
    }
    return context;
}
