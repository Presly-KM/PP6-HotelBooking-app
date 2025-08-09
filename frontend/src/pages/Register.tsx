import { useForm } from "react-hook-form";
import { useMutation } from "react-query"; // Importation de useMutation pour gérer les mutations de données
import * as apiClient from "../api-client"; // Importation du client API pour interagir avec le backend
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour naviguer entre les pages

export type RegisterFormData = {                                    // Ici on définit le type des données du formulaire d'inscription. Cela nous permet de typer les données que nous allons récupérer du formulaire. Ainsi, on s'assure que les données saisies par l'utilisateur correspondent aux types attendus.
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate(); // Ici on utilise useNavigate de react-router-dom pour naviguer entre les pages de l'application. Cela permet de rediriger l'utilisateur vers une autre page après une action, comme l'inscription.
    const {showToast} = useAppContext (); // Ici on utilise le contexte de l'application pour accéder à la fonction showToast. Cela permet d'afficher des messages de toast dans l'application, par exemple pour indiquer le succès ou l'échec de l'inscription.
    const { 
        register, 
        watch, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<RegisterFormData>();              // Ici on utilise le hook useForm de react-hook-form pour gérer le formulaire d'inscription. On spécifie le type RegisterFormData pour que les données du formulaire soient typées correctement. Le hook register est utilisé pour enregistrer les champs du formulaire.
    
    const mutation = useMutation(apiClient.register, {     // Ici on utilise useMutation de react-query pour gérer la soumission du formulaire d'inscription. On passe la fonction register du client API comme argument. Cela permet de gérer l'état de la mutation, comme le chargement, le succès et l'échec.
        onSuccess: () => {
            showToast({ 
                message: "Registration Success!",
                type: "SUCCESS", // Ici on gère le succès de la mutation. Si l'inscription réussit, on affiche un toast de succès avec le message "Registration Success!". Cela permet à l'utilisateur de savoir que son inscription a été effectuée avec succès.
            });
            navigate("/"); // Ici on redirige l'utilisateur vers la page d'accueil après une inscription réussie. Cela permet de naviguer vers une autre page de l'application, généralement la page d'accueil ou la page de connexion.
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"});             // Ici on gère l'erreur en cas d'échec de la mutation. Si l'inscription échoue, on affiche le message d'erreur dans la console. Cela permet de savoir ce qui s'est mal passé lors de la soumission du formulaire.
        },  
    });               

    const onSubmit = handleSubmit((data)=> {
        mutation.mutate(data); // Ici on définit la fonction onSubmit qui est appelée lorsque le formulaire est soumis. On utilise handleSubmit de react-hook-form pour gérer la soumission du formulaire. La fonction mutate de useMutation est appelée avec les données du formulaire pour envoyer une requête d'inscription au serveur. elle permet de déclencher la mutation avec les données du formulaire. Si la mutation réussit, on peut gérer le succès dans onSuccess. Si elle échoue, on gère l'erreur dans onError. la mutation est une fonction qui permet d'envoyer les données du formulaire au serveur pour l'inscription. Elle est déclenchée lorsque le formulaire est soumis avec succès.        
    });

    return ( 
    <form className="flex flex-col gap-5" onSubmit={onSubmit}> {/* Ici on crée un formulaire d'inscription. Le handleSubmit de react-hook-form est utilisé pour gérer la soumission du formulaire. Quand le formulaire est soumis, les données sont affichées dans la console. onSubmit est une fonction qui est appelée lorsque le formulaire est soumis avec succès. onSubmit={onSubmit} permet de lier la fonction de soumission au formulaire. */}
        <h2 className="text-3xl font-bold"> Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">       {/* Ici on crée un formulaire d'inscription avec des champs pour le prénom, le nom, l'email, le mot de passe et la confirmation du mot de passe. On utilise des classes Tailwind CSS pour le style.*/}
          <label className="text-gray-700 text-sm font-bold flex-1"> 
            Fist Name
            <input className="border rounded w-full py-1 px-2 font-normal" 
            {...register("firstName", {required: "This field is required"})}>  
            </input>
            {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input className="border rounded w-full py-1 px-2 font-normal" 
            {...register("lastName", {required: "This field is required"})}>  
            </input>
            {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input 
            type="email"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("email", {required: "This field is required"})}>  
            </input>
            {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
           <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("password", {
                required: "This field is required",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                },
                })}>  
            </input>
            {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("confirmPassword", {
                validate: (val) => {
                    if (!val){
                        return "This field is required";
                    } else if(watch("password") !== val) {
                        return "Your passwords do not match";
                    }
                },
                })}>  
            </input>
            {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
          </label>
          <span>
            <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
               Create Account 
            </button>
          </span>
    </form>
    );
};

export default Register;
        