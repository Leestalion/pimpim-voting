import axios from "axios";
import { useEffect, useState } from "react";

export const UserManagement = () => {
    const [username, setUsername] = useState<string>("");

    // Load the saved username from the local storage
    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if(savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (username) {
            try {
                await axios.post("/users", { username });
                localStorage.setItem("username", username);
                alert("Username saved!");
            } catch (error) {
                alert("Error saving username : " + error);
            }
        }
    }

    const handleSwitchUser = () => {
        localStorage.removeItem("username");
        setUsername("");
    };

    return(
        <div>
            <h1>Gestion des Utilisateurs</h1>
            {!username ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Entrer votre nom d'utilisateur" required />
                    <button type="submit">Se connecter</button>
                </form>
            ) : (
                <div>
                    <p>Actuellement connecté : {username}</p>
                    <button onClick={handleSwitchUser}>Changer d'utilisateur</button>
                </div>
            )}
        </div>
    );
};