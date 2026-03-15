import { Navigate } from 'react-router';

export default function RutaProtegida({ children }) {
    const usuarioActual = localStorage.getItem('usuario');

    if (!usuarioActual) {
        return <Navigate to="/" />;
    }

    return children;
}