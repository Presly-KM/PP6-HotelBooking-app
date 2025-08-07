import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

// Le fichier App.tsx est le point d'entrée de l'application React. Il configure les routes de l'application en utilisant React Router.
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />               {/* Ici on définit la route principale. Ainsi, quand l'utilisateur accède à la racine de l'application, il sera redirigé vers le composant Layout. On a ajouté le composant Layout à notre page d'acceuil */}
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;