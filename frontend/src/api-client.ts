import type { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {     // Ici on définit la fonction register qui prend en paramètre les données du formulaire d'inscription. Cette fonction sera utilisée pour envoyer les données au serveur lors de l'inscription d'un nouvel utilisateur.
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",                         // Ici on indique que les cookies doivent être inclus dans la requête. Cela permet au serveur de reconnaître l'utilisateur et de gérer les sessions.
        headers: {
            "Content-Type": "application/json",         // Ici on définit les en-têtes de la requête. On spécifie que le contenu de la requête (la donnée envoyée par l'utilisateur) est au format JSON. Cela permet au serveur de savoir comment interpréter les données envoyées.
        },
        body: JSON.stringify(formData),                 // Ici on convertit les données du formulaire en une chaîne JSON. Cela permet d'envoyer les données au serveur dans un format qu'il peut comprendre. 
    });

    const responseBody = await response.json();          // Ici on attend la réponse du serveur et on la convertit en JSON. Cela nous permet d'accéder aux données renvoyées par le serveur, comme un message de succès ou d'erreur.

    if (!response.ok) {                                 // Ici on vérifie si la réponse du serveur est correcte (statut HTTP 200-299). Si la réponse n'est pas correcte, cela signifie qu'il y a eu une erreur lors de l'inscription.
        throw new Error(responseBody.message);          // Si la réponse n'est pas correcte, on lance une erreur avec le message d'erreur renvoyé par le serveur ou un message par défaut.
    }
}

export const validateToken = async () => {              // Ici on définit la fonction validateToken qui sera utilisée pour valider le token de l'utilisateur. Cette fonction sera appelée pour vérifier si l'utilisateur est connecté.
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",                          // Ici on indique que les cookies doivent être inclus dans la requête. Cela permet au serveur de reconnaître l'utilisateur et de gérer les sessions.
    });

    if (!response.ok) {                                  // Ici on vérifie si la réponse du serveur est correcte (statut HTTP 200-299). Si la réponse n'est pas correcte, cela signifie que le token n'est pas valide ou que l'utilisateur n'est pas connecté.
        throw new Error("Token invalid");                 // Si la réponse n'est pas correcte,
    } 

    return response.json(); // Si la réponse est correcte, on retourne les données JSON renvoyées par le serveur. Cela peut inclure des informations sur l'utilisateur connecté, comme son ID.
};