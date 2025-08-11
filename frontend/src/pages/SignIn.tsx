import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client"; // Importation de notre client API pour utiliser la fonction signIn

export type SignInFormData = {            // Ici, on définit le type de données pour le formulaire de connexion
    email: string;
    password: string;
};

const SignIn = () => {                             // Ici, on crée le composant SignIn 
    const {register, formState: { errors }, handleSubmit } = useForm<SignInFormData>()       // Ici on utilise useForm de react-hook-form pour gérer le formulaire. On enregistre les champs du formulaire et on gère les erreurs de validation.
    
    const mutation = useMutation(apiClient.signIn, { // Ici on utilise useMutation de react-query pour gérer la soumission du formulaire. On passe la fonction signIn de notre client API comme première argument.
        onSuccess: async () => {                     // Ici on définit ce qui se passe lorsque la soumission du formulaire est réussie. On peut afficher un message de succès à l'utilisateur ou rediriger l'utilisateur vers une autre page.
            console.log("user has been signed in");
            // 1. Show the toast notification
            // 2. Navigate to the home page
        }, 
        onError: (error: Error) => { // Ici on définit ce qui se passe en cas d'erreur lors de la soumission du formulaire. On peut afficher un message d'erreur à l'utilisateur.
            // show the toast
        },
    });

    const onSubmit = handleSubmit((data)=>{ // Ici on définit la fonction qui sera appelée lorsque le formulaire sera soumis. On utilise handleSubmit de react-hook-form pour gérer la soumission du formulaire.
        mutation.mutate(data); // Ici on appelle la fonction signIn avec les données du formulaire. Si la soumission est réussie, on exécutera la fonction onSuccess définie précédemment.
    })

    return (
        <form className="flex flex-col gap-5">
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
        </form>
    );
    };

    export default SignIn;  // Ici, on exporte le composant SignIn pour qu'il puisse être utilisé dans d'autres parties de l'application