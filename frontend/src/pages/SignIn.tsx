import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client"; // Importation de notre client API pour utiliser la fonction signIn
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour naviguer entre les pages
import { useQueryClient } from "react-query"; // Importation de useQueryClient pour accéder au client de requêtes, ce qui permet de gérer les requêtes et les mutations
import { Link } from 'react-router-dom'; // Importation de Link pour créer des liens vers d'autres pages

export type SignInFormData = {            // Ici, on définit le type de données pour le formulaire de connexion
    email: string;
    password: string;
};

const SignIn = () => {                             // Ici, on crée le composant SignIn 
    const {showToast} = useAppContext(); // Ici, on utilise le contexte de l'application pour accéder à la fonction showToast. Cela permet d'afficher des messages de toast dans l'application, par exemple pour indiquer le succès ou l'échec de la connexion.
    const navigate = useNavigate(); // Ici, on utilise useNavigate de react-router-dom pour naviguer entre les pages de l'application. Cela permet de rediriger l'utilisateur vers une autre page après une action, comme la connexion.
    const queryClient = useQueryClient(); // Ici, on utilise useQueryClient de react-query pour accéder au client de requêtes. Cela permet de gérer les requêtes et les mutations dans l'application.
    const { 
        register, 
        formState: { errors }, 
        handleSubmit 
       } = useForm<SignInFormData>();       // Ici on utilise useForm de react-hook-form pour gérer le formulaire. On enregistre les champs du formulaire et on gère les erreurs de validation.
    
    const mutation = useMutation(apiClient.signIn, { // Ici on utilise useMutation de react-query pour gérer la soumission du formulaire. On passe la fonction signIn de notre client API comme première argument.
        onSuccess: async () => {                     // Ici on définit ce qui se passe lorsque la soumission du formulaire est réussie. On peut afficher un message de succès à l'utilisateur ou rediriger l'utilisateur vers une autre page.
            showToast({ message: "Sign in Successful!", type: "SUCCESS" }); // Ici on affiche un message de succès à l'utilisateur. Cela permet de lui indiquer que la connexion a réussi.
            await queryClient.invalidateQueries("validateToken");           // Ici on invalide la requête "validateToken" pour forcer une nouvelle validation du token après la connexion. Cela permet de s'assurer que l'utilisateur est bien connecté.
            navigate("/");                            // Ici on redirige l'utilisateur vers la page d'accueil après une connexion réussie. Cela permet de naviguer vers une autre page de l'application, généralement la page d'accueil ou la page de recherche.
        }, 
        onError: (error: Error) => { // Ici on définit ce qui se passe en cas d'erreur lors de la soumission du formulaire. On peut afficher un message d'erreur à l'utilisateur.
            showToast({ message: error.message, type: "ERROR" }); // Ici on affiche un message d'erreur à l'utilisateur. Cela permet de lui indiquer que la connexion a échoué.
        },
    });

    const onSubmit = handleSubmit((data)=>{ // Ici on définit la fonction qui sera appelée lorsque le formulaire sera soumis. On utilise handleSubmit de react-hook-form pour gérer la soumission du formulaire.
        mutation.mutate(data); // Ici on appelle la fonction signIn avec les données du formulaire. Si la soumission est réussie, on exécutera la fonction onSuccess définie précédemment.
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}> {/* Ici on crée le formulaire. On utilise la classe flex de Tailwind CSS pour créer une mise en page flexible et on gère la soumission du formulaire avec onSubmit. */}
            <h2 className="text-3xl font-bold">Sign In</h2>

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
          <span className="flex items-center justify-between">
            <span className="text-sm">
                Not Registered? <Link className="underline" to="/register"> Create an account here</Link>
            </span>
            <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
            >
               Login
            </button>
          </span>
        </form>
    );
    };

    export default SignIn;  // Ici, on exporte le composant SignIn pour qu'il puisse être utilisé dans d'autres parties de l'application