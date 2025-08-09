import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient } from 'react-query'; // Importation de QueryClient pour gérer les requêtes. Ainsi, on peut utiliser react-query pour gérer les requêtes API de manière efficace.
import { QueryClientProvider } from 'react-query'; // Importation de QueryClientProvider pour fournir le client de requêtes à l'application.
import { AppContextProvider } from './contexts/AppContext.tsx'; // Importation du provider de contexte pour gérer l'état global de l'application.

const queryClient = new QueryClient({  // Ici on crée une instance de QueryClient. Cela permet de configurer le client de requêtes pour l'application. On peut définir des options globales pour les requêtes, comme le nombre de tentatives de réessai en cas d'échec.
  defaultOptions: {
    queries: {
      retry: 0,             // Ici on configure le client de requêtes pour ne pas réessayer les requêtes échouées. Cela peut être utile pour éviter des boucles infinies en cas d'erreurs persistantes.
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* Ici on enveloppe l'application avec le provider de QueryClient pour que toutes les requêtes puissent utiliser le client configuré. */}
      <AppContextProvider> 
         <App />
      </AppContextProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)