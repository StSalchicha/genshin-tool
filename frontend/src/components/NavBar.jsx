import { Link, useNavigate, useLocation } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const usuarioActual = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioActual || location.pathname === '/') {
        return null;
    }

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <nav className="bg-[#182840] p-4 shadow-lg sticky top-0 z-40 border-b border-[#cca478]/30">
            <div className="max-w-[95%] mx-auto flex justify-between items-center">
                <Link to="/personajes" className="flex items-center gap-3 text-2xl font-bold text-[#cca478] hover:text-[#f0f1ec] transition-colors tracking-wide">
                    <img 
                        src="/Genshin_Impact_HoYoLAB.webp" 
                        alt="HoyoLAB Icon" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    Genshin Tool
                </Link>
                <div className="flex gap-6 text-[#f0f1ec] font-medium items-center">
                    <span className="text-[#f0f1ec]/70 text-sm italic">Hola, {usuarioActual.username}</span>
                    <Link to="/personajes" className="hover:text-[#cca478] transition-colors">Mis Personajes</Link>
                    <Link to="/armas" className="hover:text-[#cca478] transition-colors">Mis Armas</Link>
                    <button 
                        onClick={cerrarSesion}
                        className="border border-[#cca478] text-[#cca478] hover:bg-[#cca478] hover:text-[#182840] px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-300"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </nav>
    );
}