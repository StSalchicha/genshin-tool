import { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Tabla";
import Modal from "../components/Modal";
import Alerta from "../components/Alerta";

export default function Armas() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
    const USUARIO_ID = usuarioActual ? usuarioActual.id : null;

    const [misArmas, setMisArmas] = useState([]);
    const [catalogo, setCatalogo] = useState([]);
    const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
    
    const [modalOpen, setModalOpen] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null, arma_id: "", lvl: 1, refinement_rank: 1, base_atk: 0, stat_valor: 0.00
    });

    useEffect(() => {
        cargarMisArmas();
        cargarCatalogo();
    }, []);

    const cargarMisArmas = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/mis-armas/${USUARIO_ID}`);
            setMisArmas(res.data);
        } catch (error) {
            mostrarAlerta("error", "Error al cargar tus armas.");
        }
    };

    const cargarCatalogo = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/catalogo-armas");
            setCatalogo(res.data);
        } catch (error) {
            console.error("Error al cargar el catálogo de armas", error);
        }
    };

    const mostrarAlerta = (tipo, mensaje) => {
        setAlerta({ tipo, mensaje });
        setTimeout(() => setAlerta({ tipo: "", mensaje: "" }), 3000);
    };

    const abrirModalNuevo = () => {
        setModoEdicion(false);
        setFormData({ id: null, arma_id: "", lvl: 1, refinement_rank: 1, base_atk: 0, stat_valor: 0.00 });
        setModalOpen(true);
    };

    const abrirModalEditar = (arma) => {
        setModoEdicion(true);
        setFormData({ ...arma });
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!modoEdicion && !formData.arma_id) {
            mostrarAlerta("error", "Por favor, selecciona un arma de la lista visual.");
            return;
        }

        try {
            if (modoEdicion) {
                await axios.put(`http://localhost:3000/api/mis-armas/${formData.id}`, formData);
                mostrarAlerta("exito", "Estadísticas del arma actualizadas.");
            } else {
                await axios.post("http://localhost:3000/api/mis-armas", {
                    usuario_id: USUARIO_ID,
                    arma_id: formData.arma_id
                });
                mostrarAlerta("exito", "Arma agregada a tu inventario.");
            }
            setModalOpen(false);
            cargarMisArmas(); 
        } catch (error) {
            mostrarAlerta("error", error.response?.data?.error || "Ocurrió un error.");
        }
    };

    const eliminarArma = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta arma de tu inventario?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/mis-armas/${id}`);
            mostrarAlerta("exito", "Arma eliminada.");
            cargarMisArmas();
        } catch (error) {
            mostrarAlerta("error", "Error al eliminar el arma.");
        }
    };

    const columnasTabla = [
        { 
            encabezado: "Arma", 
            llave: "nombre",
            render: (item) => {
                const nombreArchivo = "Weapon_" + item.nombre.replace(/ /g, "_") + ".webp";
                return (
                    <div className="flex items-center gap-3">
                        <img 
                            src={`/${nombreArchivo}`} 
                            alt={item.nombre} 
                            className="w-16 h-16 object-cover rounded bg-[#182840] border border-[#cca478]/50 shadow-sm"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <span className="font-bold text-lg text-[#cca478]">{item.nombre}</span>
                    </div>
                );
            }
        },
        { encabezado: "★", llave: "rareza" },
        { encabezado: "Lvl", llave: "lvl" },
        { encabezado: "Refinement", llave: "refinement_rank" },
        { encabezado: "Base ATK", llave: "base_atk" },
        { encabezado: "Sub Stat", llave: "stat_tipo" },
        { encabezado: "+", llave: "stat_valor" }
    ];

    return (
        <div className="p-6 max-w-[95%] mx-auto">
            <h1 className="text-3xl font-bold text-[#cca478] mb-6 tracking-wide drop-shadow-md">Mis Armas</h1>
            
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta({tipo:"", mensaje:""})} />

            <button 
                onClick={abrirModalNuevo}
                className="bg-[#cca478] hover:bg-[#b89168] text-[#182840] font-bold py-2 px-6 rounded-md mb-6 transition-all duration-300 shadow-lg hover:shadow-[#cca478]/20 hover:-translate-y-0.5 text-base"
            >
                + Agregar Arma
            </button>

            <Tabla 
                columnas={columnasTabla} 
                datos={misArmas} 
                onEdit={abrirModalEditar} 
                onDelete={eliminarArma} 
            />

            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                titulo={modoEdicion ? "Editar Arma" : "Agregar Arma"}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {!modoEdicion && (
                        <div>
                            <label className="block text-base font-medium text-[#f0f1ec] mb-3">
                                Selecciona un Arma
                            </label>
                            
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-2 bg-[#182840]/60 rounded-md border border-[#cca478]/30">
                                
                                {catalogo.map(a => {
                                    const nombreArchivo = "Weapon_" + a.nombre.replace(/ /g, "_") + ".webp";
                                    const seleccionado = formData.arma_id === a.id;
                                    
                                    return (
                                        <div 
                                            key={a.id}
                                            onClick={() => setFormData({ ...formData, arma_id: a.id })}
                                            className={`cursor-pointer flex flex-col items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                                                seleccionado 
                                                ? 'bg-[#3a5065] border-[#cca478] shadow-[0_0_10px_rgba(204,164,120,0.5)] transform scale-105' 
                                                : 'bg-[#3e4c59]/50 border-transparent hover:border-[#cca478]/50 hover:bg-[#3a5065]/70'
                                            }`}
                                        >
                                            <img 
                                                src={`/${nombreArchivo}`} 
                                                alt={a.nombre} 
                                                className="w-16 h-16 object-cover rounded bg-[#182840] mb-2 border border-[#cca478]/20 shadow-sm"
                                                onError={(e) => e.target.style.display = 'none'} 
                                            />
                                            <span className="text-base font-bold text-[#f0f1ec] text-center leading-tight mb-2">
                                                {a.nombre}
                                            </span>
                                            <span className="text-sm text-[#cca478] bg-[#182840]/50 px-3 py-1 rounded-full font-medium">
                                                {a.rareza} ★
                                            </span>
                                        </div>
                                    );
                                })}
                                
                            </div>
                        </div>
                    )}

                    {modoEdicion && (
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Lvl", name: "lvl", min: "1", max: "90", step: "1" },
                                { label: "Refinement Rank", name: "refinement_rank", min: "1", max: "5", step: "1" },
                                { label: "Base ATK", name: "base_atk", step: "1" },
                                { label: "Sub Stat", name: "stat_valor", step: "0.1" }
                            ].map((input) => (
                                <div key={input.name}>
                                    <label className="block text-sm text-[#f0f1ec]/70 mb-1">{input.label}</label>
                                    <input 
                                        type="number" 
                                        name={input.name} 
                                        value={formData[input.name]} 
                                        onChange={handleChange} 
                                        min={input.min}
                                        max={input.max}
                                        step={input.step}
                                        className="w-full bg-[#3a5065] text-[#f0f1ec] text-base border border-[#3a5065] focus:border-[#cca478] focus:outline-none p-2 rounded transition-colors" 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-base bg-[#3e4c59] text-[#f0f1ec] border border-[#cca478]/30 rounded hover:bg-[#182840] transition-colors">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={!modoEdicion && !formData.arma_id}
                            className={`px-4 py-2 font-bold text-base rounded transition-all shadow-md ${
                                (!modoEdicion && !formData.arma_id) 
                                ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                                : 'bg-[#cca478] text-[#182840] hover:bg-[#b89168] hover:shadow-[#cca478]/20'
                            }`}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}