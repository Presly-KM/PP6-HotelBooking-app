import { useForm } from "react-hook-form";

type RegisterFormData = {                                    // Ici on définit le type des données du formulaire d'inscription. Cela nous permet de typer les données que nous allons récupérer du formulaire. Ainsi, on s'assure que les données saisies par l'utilisateur correspondent aux types attendus.
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const { register } = useForm<RegisterFormData>();              // Ici on utilise le hook useForm de react-hook-form pour gérer le formulaire d'inscription. On spécifie le type RegisterFormData pour que les données du formulaire soient typées correctement. Le hook register est utilisé pour enregistrer les champs du formulaire.
   
    return ( 
    <form className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold"> Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">       {/* Ici on crée un formulaire d'inscription avec des champs pour le prénom, le nom, l'email, le mot de passe et la confirmation du mot de passe. On utilise des classes Tailwind CSS pour le style.*/}
          <label className="text-gray-700 text-sm font-bold flex-1"> 
            Fist Name
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", {required: "This field is required"})}></input>  {/* Ici on utilise le hook register pour enregistrer le champ "firstName" du formulaire. On ajoute une validation pour rendre ce champ obligatoire. Si l'utilisateur ne remplit pas ce champ, un message d'erreur sera affiché. */}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", {required: "This field is required"})}></input>  {/* Ici on utilise le hook register pour enregistrer le champ "lastName" du formulaire. On ajoute une validation pour rendre ce champ obligatoire. Si l'utilisateur ne remplit pas ce champ, un message d'erreur sera affiché. */}
          </label>
        </div>
    </form>
    );
};

export default Register;
        