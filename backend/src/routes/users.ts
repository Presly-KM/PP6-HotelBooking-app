import express, {Request, Response} from "express";    // Ici on importe le module express pour créer des routes
import User from "../models/user"; // On importe le modèle User défini dans models/user.ts
import jwt from "jsonwebtoken"; // On importe le module jsonwebtoken pour la gestion des tokens JWT
import { check } from "express-validator"; // On importe le middleware check de express-validator pour la validation des entrées
import { validationResult } from "express-validator"; // On importe validationResult pour récupérer les erreurs de validation

const router = express.Router();

// /api/users/register
router.post("/register", [
    check("firstName", "First name is required").isString(), // On utilise le middleware check de express-validator pour valider que le prénom est une chaîne de caractères
    check("lastName", "Last name is required").isString(),   // On valide que le nom de famille est une chaîne de caractères
    check("email", "Email is required").isEmail(),           // On valide que l'email est une adresse email valide
    check("password", "Password with 6 or more characters is required").isLength({  // On valide que le mot de passe a au moins 6 caractères
      min: 6 ,
    }),
], async (req: Request, res: Response) => {                 // On définit une route POST pour l'enregistrement des utilisateurs
    const errors = validationResult(req);                   // On utilise validationResult pour récupérer les erreurs de validation
    if (!errors.isEmpty()) {                                // Si des erreurs de validation existent, on renvoie une erreur 400 avec les détails des erreurs
        return res.status(400).json({ messsage: errors.array() });
    }
    
    try {
    let user = await User.findOne({                                  // On cherche un utilisateur existant avec l'email fourni dans le corps de la requête
        email: req.body.email,
    });

    if (user) {                                                       // Si l'utilisateur existe déjà, on renvoie une erreur 400 avec un message
        return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body)     // Sinon, on crée une nouvelle instance de User avec les données du corps de la requête
    await user.save();            // On enregistre l'utilisateur dans la base de données


    const token = jwt.sign(
        { userId: user.id },                            // On crée un token JWT avec l'ID de l'utilisateur
        process.env.JWT_SECRET_KEY as string, 
        {                                               // On génère un token JWT en utilisant l'ID de l'utilisateur et la clé secrète définie dans les variables d'environnement
          expiresIn: "1d",                              // Le token expire dans 1 jour
        }
);

    res.cookie("auth_token", token, {                  // On envoie le token dans un cookie nommé "auth_token" avec les options de sécurité. Ainsi, le token est stocké côté client pour les requêtes futures
        httpOnly: true,                                // Le cookie est accessible uniquement par le serveur 
        secure: process.env.NODE_ENV === "production", // Le cookie est sécurisé en production. Ainsi, il n'est pas envoyé sur des connexions non sécurisées
        maxAge: 86400000,                              // Le cookie expire après 1 jour (86400000 ms)
    });
    return res.sendStatus(200)                         // On renvoie un statut 200 OK pour indiquer que l'enregistrement a réussi
}  catch (error) {
    console.log(error);           // On log l'erreur dans la console pour le débogage
    res.status(500).send({ message: "Something went wrong" }); // En cas d'erreur, on renvoie une erreur 500 avec un message
 }
});

export default router; // On exporte le routeur pour l'utiliser dans d'autres parties de l'application