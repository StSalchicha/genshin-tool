export default function Alerta({ tipo, mensaje, onClose }) {
    if (!mensaje) return null;

    const esExito = tipo === 'exito';
    
    const borderColor = esExito ? "border-l-[#cca478]" : "border-l-red-500";
    
    const icon = esExito ? "✦" : "⚠";
    const iconColor = esExito ? "text-[#cca478]" : "text-red-400";

    return (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 p-4 rounded-r-md shadow-2xl border-l-4 bg-[#3e4c59] ${borderColor} min-w-[280px]`}>
            <span className={`text-xl ${iconColor}`}>{icon}</span>
            <p className="text-[#f0f1ec] font-medium text-sm flex-1">{mensaje}</p>
            <button 
                onClick={onClose} 
                className="text-[#f0f1ec]/50 hover:text-[#f0f1ec] transition-colors text-lg ml-2 font-bold"
                title="Cerrar"
            >
                ✕
            </button>
        </div>
    );
}