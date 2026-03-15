import { Route, Routes } from 'react-router';
import Index from '../pages/Index';
import Prueba from '../pages/Prueba';
import Personajes from '../pages/Personajes';
import Navbar from '../components/NavBar';
import Armas from '../pages/Armas'
import RutaProtegida from '../components/RutaProtegida';

export default function AppRouter(){
    return(
        <>
            <Navbar />
            <main className="min-h-screen bg-[#182840] text-[#f0f1ec]">
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/prueba" element={<Prueba/>}/>
                    <Route path="/personajes" element={
                        <RutaProtegida>
                            <Personajes/>
                        </RutaProtegida>
                    }/>
                    <Route path="/armas" element={
                        <RutaProtegida>
                            <Armas/>
                        </RutaProtegida>
                    }/>
                </Routes>
            </main>
        </>
    )
}