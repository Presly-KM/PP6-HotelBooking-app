import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";  // Importation de mongoose pour la connexion à MongoDB

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)  // Connexion à MongoDB en utilisant la chaîne de connexion stockée dans le fichier .env. On utilise "as string" pour indiquer à TypeScript que cette variable est une chaîne de caractères. Ainsi, on évite les erreurs de type si la variable n'est pas définie.

const app = express(); // Création de l'application Express
app.use(express.json()); // Ici on utilise express.json() pour parser le JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); // Pour parser les données URL-encoded
app.use(cors()); // Utilisation de CORS pour permettre les requêtes cross-origin c'est-à-dire que le frontend peut communiquer avec le backend. Par exemeple, si le frontend est sur http://localhost:3000 et le backend sur http://localhost:5000, CORS permet au frontend d'accéder aux ressources du backend.

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello from express endpoint!" });
});

app.listen(7000, () => {
 console.log("Server running on localhost:7000");
});