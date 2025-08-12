import  { useMutation } from 'react-query'; // On importe useMutation de react-query pour gérer les mutations
import * as apiClient from '../api-client'; // On importe le client API pour effectuer les requêtes au serveur
import { useAppContext } from '../contexts/AppContext'; // On importe le hook useAppContext pour accéder au contexte de l'application
import { useQueryClient } from 'react-query'; // On importe useQueryClient pour accéder au client de requêtes, ce qui permet de gérer les requêtes et les mutations


const SignOutButton = () => {
    const queryClient = useQueryClient(); // On utilise useQueryClient pour accéder au client de requêtes, ce qui permet de gérer les requêtes et les mutations
    const { showToast } = useAppContext(); // On utilise le contexte AppContext pour accéder à la fonction showToast qui permet d'afficher des messages à l'utilisateur
   
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // On invalide la requête "validateToken" pour forcer une nouvelle validation du token après la déconnexion
            showToast({ message : "Signed Out!", type: "SUCCESS"}); // On utilise la fonction showToast pour afficher un message de succès lorsque la déconnexion est réussie
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" }); // On utilise la fonction showToast pour afficher un message d'erreur si la déconnexion échoue
        },
    });

    const handleClick = () => {
        mutation.mutate(); // On appelle la fonction mutate de useMutation pour déclencher la mutation  
    };

    return ( 
        <button 
          onClick={handleClick} // On définit un gestionnaire d'événement onClick qui appelle handleClick lorsque le bouton est cliqué
          className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">
            Sign Out 
        </button>
    );
};

export default SignOutButton; // On exporte le composant SignOutButton pour l'utiliser dans d'autres parties de l'application
    