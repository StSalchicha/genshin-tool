import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Index() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const res = await axios.post(`http://localhost:3000${endpoint}`, formData);

            localStorage.setItem('usuario', JSON.stringify(res.data));
            navigate('/personajes');
        } catch (err) {
            setError(err.response?.data?.error || 'Ocurrió un error al procesar la solicitud');
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen relative"
            style={{ 
                backgroundImage: "url('/Wallpaper_Green.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-[#182840]/60 backdrop-blur-md z-0"></div>
            <div className="bg-[#3e4c59]/90 p-10 rounded-xl shadow-2xl w-96 border border-[#cca478]/40 relative z-10 backdrop-blur-sm">

                <h2 className="text-3xl font-bold text-center text-[#f0f1ec] mb-8 tracking-wide drop-shadow-md">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-[#f0f1ec] p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-[#f0f1ec] mb-1 drop-shadow-sm">Usuario</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange}
                            required
                            className="w-full bg-[#3a5065] text-[#f0f1ec] border border-[#3a5065] rounded-md p-3 focus:outline-none focus:border-[#cca478] transition-colors placeholder-[#f0f1ec]/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#f0f1ec] mb-1 drop-shadow-sm">Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange}
                            required
                            className="w-full bg-[#3a5065] text-[#f0f1ec] border border-[#3a5065] rounded-md p-3 focus:outline-none focus:border-[#cca478] transition-colors placeholder-[#f0f1ec]/50"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#cca478] hover:bg-[#b89168] text-[#182840] font-bold py-3 px-4 rounded-md transition-all duration-300 mt-4 shadow-lg hover:shadow-[#cca478]/20 hover:-translate-y-0.5"
                    >
                        {isLogin ? 'Entrar' : 'Crear cuenta'}
                    </button>
                </form>

                <p className="text-center text-sm text-[#f0f1ec]/90 mt-6">
                    {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setFormData({ username: '', password: '' });
                        }} 
                        className="text-[#cca478] font-bold hover:underline transition-all drop-shadow-sm"
                    >
                        {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                    </button>
                </p>
            </div>
        </div>
    );
}