export default function Modal({ isOpen, onClose, titulo, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#182840]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
            <div className="bg-[#3e4c59] p-6 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#cca478]/40 transform transition-all">
                <div className="flex justify-between items-center mb-6 border-b border-[#cca478]/20 pb-4">
                    <h2 className="text-2xl font-bold text-[#cca478] tracking-wide">
                        {titulo}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-[#f0f1ec]/50 hover:text-[#cca478] text-xl font-bold transition-colors w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#182840]/50"
                        title="Cerrar"
                    >
                        ✕
                    </button>
                </div>
                <div className="text-[#f0f1ec]">
                    {children}
                </div>
            </div>
        </div>
    );
}