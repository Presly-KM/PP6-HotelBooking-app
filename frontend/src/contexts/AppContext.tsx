import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Toast from "../components/Toast"; // Importation du composant Toast pour afficher des messages de notification
import { useQuery } from "react-query";
import * as apiClient from "../api-client"; // Importation du client API pour interagir avec le backend


type ToastMessage = {
    message: string; // Le message à afficher dans le toast
    type: "SUCCESS" | "ERROR"; // Le type de toast, soit succès, soit erreur
}

type AppContext = { 
    showToast: (toastMessage: ToastMessage) => void; // Fonction pour afficher un toast avec un message
    isLoggedIn?: boolean; // Indique si l'utilisateur est connecté, optionnel
}

const AppContext = React.createContext<AppContext | undefined>(undefined); // Création du contexte AppContext, initialisé à undefined

export const AppContextProvider = ({
    children,
} : {
    children: React.ReactNode;
    }) => {
        const [toast, setToast] = useState<ToastMessage | undefined>(undefined); // Ici on utilise useState pour gérer l'état du toast. On initialise le toast à undefined, ce qui signifie qu'il n'y a pas de toast affiché au départ. 
 
        const { isError } = useQuery( "validateToken", apiClient.validateToken, {  // Ici on utilise useQuery de react-query pour valider le token de l'utilisateur.
            retry: false,                    // On ne réessaie pas la requête en cas d'erreur
        });
  
   return (
    <AppContext.Provider 
    value={{
      showToast: (toastMessage) => {
       setToast(toastMessage); // Ici on définit la fonction showToast qui met à jour l'état du toast avec le message passé en paramètre. Cela permet d'afficher un toast avec le message et le type spécifiés.
      },
      isLoggedIn: !isError, // Ici on définit isLoggedIn qui est vrai si la requête de validation du token n'a pas échoué. Cela signifie que l'utilisateur est connecté si la requête réussit.
    }}
    >      
       {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(undefined)} 
          />
          )}                               {/* Ici on affiche le toast si l'état du toast n'est pas undefined. Si un toast est défini, il est affiché avec le message et le type spécifiés. La fonction onClose permet de fermer le toast en mettant l'état du toast à undefined. */}
        {children} {                       /* Ici on enveloppe les enfants du contexte AppContextProvider. Cela permet à tous les composants enfants d'accéder au contexte AppContext. */}
    </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext); // Ici on utilise useContext pour accéder au contexte AppContext. Cela permet aux composants de consommer le contexte.  
    return context as AppContext; // On retourne le contexte typé comme AppContext. Cela permet d'utiliser les fonctions et propriétés définies dans AppContext.
};
