import { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Tabla";
import Modal from "../components/Modal";
import Alerta from "../components/Alerta";

export default function Personajes() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
    const USUARIO_ID = usuarioActual ? usuarioActual.id : null;

    const [misPersonajes, setMisPersonajes] = useState([]);
    const [catalogo, setCatalogo] = useState([]);
    const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
    
    const [modalOpen, setModalOpen] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null, personaje_id: "", max_hp: 0, atk: 0, def: 0, elemental_mastery: 0,
        crit_rate: 5.00, crit_dmg: 50.00, energy_recharge: 100.00, vision_dmg_bonus: 0.00
    });

    useEffect(() => {
        cargarMisPersonajes();
        cargarCatalogo();
    }, []);

    const cargarMisPersonajes = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/mis-personajes/${USUARIO_ID}`);
            setMisPersonajes(res.data);
        } catch (error) {
            mostrarAlerta("error", "Error al cargar tus personajes.");
        }
    };

    const cargarCatalogo = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/catalogo-personajes");
            setCatalogo(res.data);
        } catch (error) {
            console.error("Error al cargar catálogo", error);
        }
    };

    const mostrarAlerta = (tipo, mensaje) => {
        setAlerta({ tipo, mensaje });
        setTimeout(() => setAlerta({ tipo: "", mensaje: "" }), 3000); 
    };

    const abrirModalNuevo = () => {
        setModoEdicion(false);
        setFormData({
            id: null, personaje_id: "", max_hp: 0, atk: 0, def: 0, elemental_mastery: 0,
            crit_rate: 5.00, crit_dmg: 50.00, energy_recharge: 100.00, vision_dmg_bonus: 0.00
        });
        setModalOpen(true);
    };

    const abrirModalEditar = (personaje) => {
        setModoEdicion(true);
        setFormData({ ...personaje }); 
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!modoEdicion && !formData.personaje_id) {
            mostrarAlerta("error", "Por favor, selecciona un personaje de la lista visual.");
            return;
        }

        try {
            if (modoEdicion) {
                await axios.put(`http://localhost:3000/api/mis-personajes/${formData.id}`, formData);
                mostrarAlerta("exito", "Estadísticas actualizadas correctamente.");
            } else {
                await axios.post("http://localhost:3000/api/mis-personajes", {
                    usuario_id: USUARIO_ID,
                    personaje_id: formData.personaje_id
                });
                mostrarAlerta("exito", "Personaje agregado a tu cuenta.");
            }
            setModalOpen(false);
            cargarMisPersonajes(); 
        } catch (error) {
            mostrarAlerta("error", error.response?.data?.error || "Ocurrió un error.");
        }
    };

    const eliminarPersonaje = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este personaje de tu cuenta?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/mis-personajes/${id}`);
            mostrarAlerta("exito", "Personaje eliminado.");
            cargarMisPersonajes();
        } catch (error) {
            mostrarAlerta("error", "Error al eliminar el personaje.");
        }
    };

    const columnasTabla = [
        { 
            encabezado: "Personaje", 
            llave: "nombre",
            render: (item) => {
                const nombreArchivo = item.nombre.replace(/ /g, "_") + "_Icon.webp";
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
        { 
            encabezado: "Vision", 
            llave: "vision",
            render: (item) => {
                const nombreElemento = `Element_${item.vision}.webp`; 
                return (
                    <div className="flex items-center gap-2">
                        <img 
                            src={`/${nombreElemento}`} 
                            alt={item.vision}
                            title={item.vision}
                            className="w-8 h-8 object-contain drop-shadow-md"
                            onError={(e) => e.target.style.display = 'none'} 
                        />
                        <span className="font-medium text-base text-[#f0f1ec]/90">{item.vision}</span>
                    </div>
                );
            }
        },
        { encabezado: "Max HP", llave: "max_hp" },
        { encabezado: "ATK", llave: "atk" },
        { encabezado: "DEF", llave: "def" },
        { encabezado: "EM", llave: "elemental_mastery" },
        { encabezado: "CRIT. Rate %", llave: "crit_rate" },
        { encabezado: "CRIT. DMG %", llave: "crit_dmg" },
        { encabezado: "ER %", llave: "energy_recharge" },
        { encabezado: "DMG Bonus %", llave: "vision_dmg_bonus" }
    ];

    return (
        <div className="p-6 max-w-[95%] mx-auto">
            <h1 className="text-3xl font-bold text-[#cca478] mb-6 tracking-wide drop-shadow-md">Mis Personajes</h1>
            
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta({tipo:"", mensaje:""})} />

            <button 
                onClick={abrirModalNuevo}
                className="bg-[#cca478] hover:bg-[#b89168] text-[#182840] font-bold py-2 px-6 rounded-md mb-6 transition-all duration-300 shadow-lg hover:shadow-[#cca478]/20 hover:-translate-y-0.5 text-base"
            >
                + Agregar Personaje
            </button>

            <Tabla 
                columnas={columnasTabla} 
                datos={misPersonajes} 
                onEdit={abrirModalEditar} 
                onDelete={eliminarPersonaje} 
            />

            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                titulo={modoEdicion ? "Editar Estadísticas" : "Agregar Personaje"}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {!modoEdicion && (
                        <div>
                            <label className="block text-base font-medium text-[#f0f1ec] mb-3">
                                Selecciona un Personaje
                            </label>
                            
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-2 bg-[#182840]/60 rounded-md border border-[#cca478]/30">
                                
                                {catalogo.map(p => {
                                    const nombreArchivo = p.nombre.replace(/ /g, "_") + "_Icon.webp";
                                    const seleccionado = formData.personaje_id === p.id;
                                    const nombreElemento = `Element_${p.vision}.webp`;
                                    
                                    return (
                                        <div 
                                            key={p.id}
                                            onClick={() => setFormData({ ...formData, personaje_id: p.id })}
                                            className={`cursor-pointer flex flex-col items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                                                seleccionado 
                                                ? 'bg-[#3a5065] border-[#cca478] shadow-[0_0_10px_rgba(204,164,120,0.5)] transform scale-105' 
                                                : 'bg-[#3e4c59]/50 border-transparent hover:border-[#cca478]/50 hover:bg-[#3a5065]/70'
                                            }`}
                                        >
                                            <img 
                                                src={`/${nombreArchivo}`} 
                                                alt={p.nombre} 
                                                className="w-16 h-16 object-cover rounded bg-[#182840] mb-2 border border-[#cca478]/20 shadow-sm"
                                                onError={(e) => e.target.style.display = 'none'} 
                                            />
                                            <span className="text-base font-bold text-[#f0f1ec] text-center leading-tight mb-2">
                                                {p.nombre}
                                            </span>
                                            
                                            <div className="flex items-center gap-1 bg-[#182840]/50 px-3 py-1 rounded-full">
                                                <img 
                                                    src={`/${nombreElemento}`} 
                                                    alt={p.vision} 
                                                    className="w-4 h-4 object-contain"
                                                    onError={(e) => e.target.style.display = 'none'} 
                                                />
                                                <span className="text-sm text-[#cca478] font-medium">
                                                    {p.vision}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                
                            </div>
                        </div>
                    )}

                    {modoEdicion && (
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Max HP", name: "max_hp", step: "1" },
                                { label: "ATK", name: "atk", step: "1" },
                                { label: "DEF", name: "def", step: "1" },
                                { label: "Elemental Mastery", name: "elemental_mastery", step: "1" },
                                { label: "CRIT. Rate (%)", name: "crit_rate", step: "0.1" },
                                { label: "CRIT. DMG (%)", name: "crit_dmg", step: "0.1" },
                                { label: "Energy Recharge (%)", name: "energy_recharge", step: "0.1" },
                                { label: "DMG Bonus", name: "vision_dmg_bonus", step: "0.1" }
                            ].map((input) => (
                                <div key={input.name}>
                                    <label className="block text-sm text-[#f0f1ec]/70 mb-1">{input.label}</label>
                                    <input 
                                        type="number" 
                                        step={input.step}
                                        name={input.name} 
                                        value={formData[input.name]} 
                                        onChange={handleChange} 
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
                            disabled={!modoEdicion && !formData.personaje_id}
                            className={`px-4 py-2 font-bold text-base rounded transition-all shadow-md ${
                                (!modoEdicion && !formData.personaje_id) 
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