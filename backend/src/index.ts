import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";  // Importation de mongoose pour la connexion à MongoDB
import userRoutes from "./routes/users"; // Importation des routes des utilisateurs
import authRoutes from "./routes/auth"; // Importation des routes d'authentification
import cookieParser from "cookie-parser"; // Importation de cookie-parser pour gérer les cookies 

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database:", process.env.MONGODB_CONNECTION))  // Connexion à MongoDB en utilisant la chaîne de connexion stockée dans le fichier .env. On utilise "as string" pour indiquer à TypeScript que cette variable est une chaîne de caractères. Ainsi, on évite les erreurs de type si la variable n'est pas définie.

const app = express(); // Création de l'application Express
app.use(cookieParser()); // Middleware pour parser les cookies dans les requêtes. Cela permet d'accéder aux cookies dans req.cookies
app.use(express.json()); // Ici on utilise express.json() pour parser le JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); // Pour parser les données URL-encoded
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ici on utilise CORS pour permettre les requêtes cross-origin. On spécifie l'URL du frontend pour autoriser les requêtes provenant de cette origine. Cela permet au frontend d'accéder aux ressources du backend.
    credentials: true,                // Ici on indique que les cookies doivent être inclus dans les requêtes. Cela permet au serveur de reconnaître l'utilisateur et de gérer les sessions.
})                                    // Utilisation de CORS pour permettre les requêtes cross-origin c'est-à-dire que le frontend peut communiquer avec le backend. Par exemeple, si le frontend est sur http://localhost:3000 et le backend sur http://localhost:5000, CORS permet au frontend d'accéder aux ressources du backend.
);
app.use("/api/auth", authRoutes); // Importation des routes d'authentification. Ainsi, toutes les requêtes vers /api/auth seront gérées par le routeur authRoutes. En gros toutes les requetes qui viennent dans notre API avec le préfixe /api/auth seront gérées par les routes définies dans le fichier auth.ts (AuthRoutes).
app.use("/api/users", userRoutes); // Importation des routes des utilisateurs. Ainsi, toutes les requêtes vers /api/users seront gérées par le routeur userRoutes. En gros toutes les requetes qui viennent dans notre API avec le préfixe /api/users seront gérées par les routes définies dans le fichier users.ts (UserRoutes).

app.listen(7000, () => {
 console.log("Server running on localhost:7000");
});