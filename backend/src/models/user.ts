import mongoose from "mongoose";
import bcrypt from "bcryptjs";                                // On importe bcrypt pour le hachage des mots de passe

// On veut ici créer un modèle pour les utilisateurs dans notre base de données MongoDB
export type UserType = {                                      // Ici on définit le type qui représente un utilisateur
   _id: string;
   email: string;
   password: string;
   firstName: string;
   lastName: string;
};

const userSchema = new mongoose.Schema({                      // On crée un schéma pour notre modèle d'utilisateur. Le UserSchema détermine quels propriétés sont stockées contre l'utilisateur dans un document donné.
   email: { type: String, required: true, unique: true },     // L'email est une chaîne de caractères, requis et unique
   password: { type: String, required: true },                // Le mot de passe est une chaîne de caractères, requis
   firstName: { type: String, required: true },               // Le prénom est une chaîne de caractères, requis
   lastName: { type: String, required: true },                // Le nom de famille est une chaîne de caractères, requis
});

userSchema.pre("save", async function (next) {                // Avant de sauvegarder un utilisateur, on peut ajouter des hooks pour effectuer des actions supplémentaires, comme le hachage du mot de passe. "pre" signifie que cette fonction sera exécutée avant l'enregistrement du document.
    if (this.isModified("password")) {                        // Si le mot de passe a été modifié, on peut le hacher ici. "this" fait référence au document utilisateur en cours de sauvegarde.
         this.password = await bcrypt.hash(this.password, 8); // On utilise bcrypt pour hacher le mot de passe avec un coût de 8
    }
    next();                                                   // On appelle next() pour passer à la prochaine étape du middleware
});

const User = mongoose.model<UserType>("User", userSchema);    // On crée le modèle User à partir du schéma défini userSchema. Le modèle User est lié au type UserType. Ainsi, il est possible d'utiliser ce modèle pour interagir avec la collection "users" dans la base de données MongoDB.

export default User;                                          // On exporte le modèle User pour l'utiliser dans d'autres parties de l'application