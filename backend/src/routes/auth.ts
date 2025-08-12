import express, { Request, Response } from "express"; // On importe le module express pour créer des routes
import { check } from "express-validator";
import { validationResult } from "express-validator"; // On importe validationResult pour récupérer les erreurs de validation
import User from "../models/user"; // On importe le modèle User défini dans models/user.ts
import bcrypt from "bcryptjs"; // On importe bcrypt pour le hachage des mots de passe
import jwt from "jsonwebtoken"; // On importe le module jsonwebtoken pour la gestion des tokens JWT
import verifyToken from "../middleware/auth";


const router = express.Router(); // On crée un routeur Express pour gérer les routes liées à l'authentification

router.post("/login", [
    check("email", "Email is required").isEmail(), // On valide que l'email est une adresse email valide
    check("password", "Password with 6 or more characters is required").isLength({ // On valide que le mot de passe a au moins 6 caractères
        min: 6,
    }),
], async (req: Request, res: Response)=>{  // On définit une route POST pour la connexion des utilisateurs
    const errors = validationResult(req)    // On utilise validationResult pour récupérer les erreurs de validation
    if (!errors.isEmpty()) {                // Si des erreurs de validation existent, on renvoie une erreur 400 avec les détails des erreurs
        return res.status(400).json({ message: errors.array() }) // On renvoie un statut 400 Bad Request avec les erreurs de validation
    }

    const { email, password } = req.body; // On extrait l'email et le mot de passe du corps de la requête

    try {
        const user = await User.findOne({ email }); // On cherche un utilisateur existant avec l'email fourni dans le corps de la requête
        if (!user) { // Si l'utilisateur n'existe pas, on renvoie une erreur 400 avec un message
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // On compare le mot de passe fourni avec le mot de passe haché stocké dans la base de données 
        if (!isMatch) {                                                // Si les mots de passe ne correspondent pas, on renvoie une erreur 400 avec un message
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, { // On crée un token JWT avec l'ID de l'utilisateur et la clé secrète définie dans les variables d'environnement
            expiresIn: "1d",                                                             // Le token expire dans 1 jour
        });

        res.cookie("auth_token", token, {  // On envoie le token dans un cookie nommé "auth_token" avec les options de sécurité. Ainsi, le token est stocké côté client pour les requêtes futures
            httpOnly: true,                // Le cookie est accessible uniquement par le serveur. Ainsi, il n'est pas accessible par le JavaScript côté client
            secure: process.env.NODE_ENV === "production", // Le cookie est sécurisé en production. Ainsi, il n'est pas envoyé sur des connexions non sécurisées. Exemple : secure: true en production, secure: false en développement ce qui permet de tester l'application localement sans HTTPS
            maxAge: 86400000,              // Le cookie expire après 1 jour (86400000 ms)
        });

        res.status(200).json({ userId : user._id}); // On renvoie un statut 200 OK avec l'ID de l'utilisateur pour indiquer que la connexion a réussi

    } catch (error) {
        console.log(error); // On log l'erreur dans la console pour le débogage
        res.status(500).json({ message: "Something went wrong" }); // En cas d'erreur, on renvoie une erreur 500 avec un message
    }
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => { // On définit une route GET pour valider le token JWT
    res.status(200).send({ userId: req.userId }); // Si le token est valide, on renvoie un statut 200 OK avec l'ID de l'utilisateur
});

router.post("/logout", (req: Request, res: Response) => { // On définit une route POST pour la déconnexion des utilisateurs
    res.cookie("auth_token", "", { 
        expires: new Date(0), // On supprime le cookie "auth_token" en le définissant avec une date d'expiration passée
    });
    res.send();               // On renvoie une réponse vide pour indiquer que la déconnexion a réussi
})
export default router; // On exporte  le routeur pour l'utiliser dans d'autres parties de l'application