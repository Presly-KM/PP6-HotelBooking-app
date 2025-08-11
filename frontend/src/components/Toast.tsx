import { useEffect } from "react";


type ToastProps = {
    message: string; // Le message à afficher dans le toast
    type: "SUCCESS" | "ERROR"; // Le type de toast, soit succès, soit erreur
    onClose: () => void; // Fonction pour fermer le toast
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
           onClose();
        }, 5000)

        return () =>  {
            clearTimeout(timer); // Ici on utilise useEffect pour créer un effet de bord qui se déclenche après que le composant a été monté. On utilise setTimeout pour supprimer le toast après 5 secondes. Cela permet de ne pas encombrer l'interface avec des toasts persistants.
        };
    }, [onClose]);                          // Ici on utilise useEffect pour créer un effet de bord qui se déclenche après que le composant a été monté. On utilise setTimeout pour supprimer le toast après 5 secondes. Cela permet de ne pas encombrer l'interface avec des toasts persistants.
    
    const styles = 
      type === "SUCCESS"
        ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
        : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div className={styles}>
          <div className="flex justify-center items-center"> 
           <span className="text-lg font-semibold">{message}</span>
          </div>
        </div>
    );
};

export default Toast; // Ici on exporte le composant Toast pour qu'il puisse être utilisé dans d'autres parties de l'application. Cela permet de centraliser la logique d'affichage des toasts et de réutiliser le composant dans différents contextes.