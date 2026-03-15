export default function Tabla({ columnas, datos, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-[#3e4c59] rounded-lg shadow-xl mt-4 border border-[#cca478]/20">
            <table className="w-full text-base text-left text-[#f0f1ec]">
                <thead className="text-sm text-[#cca478] uppercase bg-[#182840] border-b border-[#cca478]/30">
                    <tr>
                        {columnas.map((col, index) => (
                            <th key={index} className="px-6 py-4 font-bold tracking-wider">
                                {col.encabezado}
                            </th>
                        ))}
                        <th className="px-6 py-4 text-center font-bold tracking-wider">Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    {datos.length === 0 ? (
                        <tr>
                            <td colSpan={columnas.length + 1} className="text-center py-8 text-[#f0f1ec]/60 italic">
                                No hay registros disponibles en tu inventario.
                            </td>
                        </tr>
                    ) : (
                        datos.map((item) => (
                            <tr key={item.id} className="border-b border-[#cca478]/10 hover:bg-[#3a5065]/60 transition-colors">
                                {columnas.map((col, index) => (
                                    <td key={index} className="px-6 py-4">
                                        {col.render ? col.render(item) : item[col.llave]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 flex justify-center gap-3">
                                    <button 
                                        onClick={() => onEdit(item)}
                                        className="bg-[#cca478] hover:bg-[#b89168] text-[#182840] px-4 py-1.5 rounded text-sm font-bold transition-all shadow-md hover:shadow-[#cca478]/20"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => onDelete(item.id)}
                                        className="bg-red-900/60 hover:bg-red-800 text-[#f0f1ec] border border-red-500/50 px-3 py-1.5 rounded text-sm font-bold transition-all shadow-md"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}