import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";           // On importe le module jsonwebtoken pour la gestion des tokens JWT
import { JwtPayload } from "jsonwebtoken"; // On importe JwtPayload pour typer le payload du token JWT

declare global {
    namespace Express {
         interface Request {
               userId: string; // On étend l'interface Request d'Express pour inclure userId, qui sera utilisé pour stocker l'ID de l'utilisateur authentifié
         }
      }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies["auth_token"];        // On récupère le token JWT depuis les cookies de la requête
   if (!token) {                                   // Si le token n'existe pas, on renvoie une erreur 401 Unauthorized
       return res.status(401).json({ message: "Unauthorized" });
   }

   try  {
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string); // On vérifie le token avec la clé secrète définie dans les variables d'environnement
       req.userId = (decoded as JwtPayload).userId; // On extrait l'ID de l'utilisateur du token décodé et on l'ajoute à la requête pour qu'il soit accessible dans les routes suivantes
         next(); // On appelle next() pour passer au middleware ou à la route suivante
   } catch (error) {                              // Si une erreur se produit lors de la vérification du token, on renvoie une erreur 500 Internal Server Error
       return res.status(401).json({ message: "Unauthorized" });     
   }
};
export default verifyToken; // On exporte le middleware verifyToken pour l'utiliser dans d'autres parties de l'application