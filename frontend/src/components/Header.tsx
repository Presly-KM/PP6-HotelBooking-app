import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
    <div className="bg-blue-800 py-6">                           {/* Ici on utilise "bg-blue-800" pour le fond bleu et "py-6" pour l'espacement vertical */}
       <div className="container mx-auto flex justify-between">         {/* Ici on utilise "container mx-auto" pour centrer le contenu et "flex justify-between" pour espacer les éléments horizontalement */}
        <span className="text-3xl text-white font-bold tracking-tight"> {/* Ici on utilise la classe "tracking-tight" pour réduire l'espacement entre les lettres */}
            <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
            <Link 
                to="/sign-in" 
                  className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100">
                Sign In  
            </Link>
          </span>
       </div>
   </div>
    );
};

export default Header;