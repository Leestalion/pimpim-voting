import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if(status === 400) {
        console.error("Requête invalide.");
        toast.error("Requête invalide: " + data.error);
      } else if (status === 401) {
        console.error("Accès non autorisé.");
        toast.error("Accès non autorisé: " + data.error);
      } else if (status === 403) {
        console.error("Interdit - vous n'avez pas la permission.");
        toast.error("Interdit: " + data.error);
      } else if (status === 500) {
        console.error("Erreur du serveur - Réessayez plus tard.");
        toast.error("Erreur du serveur: " + data.message);
      } else {
        console.error(
          "Erreur de requête" + status,
          data.error || "Erreur inconnue."
        );
        toast.error("Erreur de requête: " + data.error);
      }
    } else if (error.request) {
      console.error("Erreur réseau: Pas de réponse du serveur.");
      toast.error("Erreur réseau: Pas de réponse du serveur.");
    } else {
      console.error("Erreur de requête: ", error.error);
      toast.error("Erreur de requête: " + error.error);
    }

    return Promise.reject(error);
  }
);
