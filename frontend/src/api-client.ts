import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";

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

export const signIn = async (formData: SignInFormData)=> {    // Ici on définit la fonction signIn qui prend en paramètre les données du formulaire de connexion. Cette fonction sera utilisée pour envoyer les données au serveur lors de la connexion d'un utilisateur.
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",                         // Ici on indique que les cookies doivent être inclus dans la requête. Cela permet au serveur de reconnaître l'utilisateur et de gérer les sessions.
        headers: {
            "Content-Type": "application/json",         // Ici on définit les en-têtes de la requête. On spécifie que le contenu de la requête (la donnée envoyée par l'utilisateur) est au format JSON. Cela permet au serveur de savoir comment interpréter les données envoyées.
        },
        body: JSON.stringify(formData),                 // Ici on convertit les données du formulaire en une chaîne JSON. Cela permet d'envoyer les données au serveur dans un format qu'il peut comprendre.
    });

    const body = await response.json();                // Ici on attend la réponse du serveur et on la convertit en JSON. Cela nous permet d'accéder aux données renvoyées par le serveur, comme un message de succès ou d'erreur.    
    if (!response.ok) {                                 // Ici on vérifie si la réponse du serveur est correcte (statut HTTP 200-299). Si la réponse n'est pas correcte, cela signifie qu'il y a eu une erreur lors de la connexion.
        throw new Error(body.message);                  // Si la réponse n'est pas correcte, on lance une erreur avec le message d'erreur renvoyé par le serveur ou un message par défaut.
    }
    return body;                                        // Si la réponse est correcte, on retourne le corps de la réponse. Cela peut inclure des informations sur l'utilisateur connecté, comme son ID ou son nom.
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

export const signOut = async () => {                // Ici on définit la fonction signOut qui sera utilisée pour déconnecter l'utilisateur. Cette fonction sera appelée lorsque l'utilisateur souhaite se déconnecter de l'application.
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",                        // Ici on indique que les cookies doivent être inclus dans la requête. Cela permet au serveur de reconnaître l'utilisateur et de gérer les sessions.
        method: "POST",                                // Ici on spécifie que la méthode de la requête est POST. Cela indique au serveur que l'on souhaite effectuer une action (dans ce cas, déconnecter l'utilisateur).
    });

    if (!response.ok) {                               // Ici on vérifie si la réponse du serveur est correcte (statut HTTP 200-299). Si la réponse n'est pas correcte, cela signifie qu'il y a eu une erreur lors de la déconnexion.
        throw new Error("Error during sign out");        // Si la réponse n'est pas correcte, on lance une erreur avec un message indiquant que la déconnexion a échoué.
    }
}