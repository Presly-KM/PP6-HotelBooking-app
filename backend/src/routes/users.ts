import express, {Request, Response} from "express";    // Ici on importe le module express pour créer des routes
import User from "../models/user"; // On importe le modèle User défini dans models/user.ts

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {    // On définit une route POST pour l'enregistrement des utilisateurs
 try {
    let user = await User.findOne({                                  // On cherche un utilisateur existant avec l'email fourni dans le corps de la requête
        email: req.body.email,
    });

    if (user) {                                                       // Si l'utilisateur existe déjà, on renvoie une erreur 400 avec un message
        return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body)     // Sinon, on crée une nouvelle instance de User avec les données du corps de la requête
    await user.save();            // On enregistre l'utilisateur dans la base de données
 }  catch (error) {
    console.log(error);           // On log l'erreur dans la console pour le débogage
    res.status(500).send({ message: "Something went wrong" }); // En cas d'erreur, on renvoie une erreur 500 avec un message
 }
});