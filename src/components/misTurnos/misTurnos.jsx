export default function MisTurnos() {
    return (
            <div className="grid grid-cols-5 md:grid-cols-7 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4">
                <div className="flex">
                    <span className="font-bold text-[#5F5F5F] hidden md:block mr-8"></span>
                    <p className="font-bold text-[#5F5F5F] ml-4">Fecha</p>
                </div>
                <p className="font-bold text-[#5F5F5F]">Hora</p>
                <p className="font-bold text-[#5F5F5F]">Medico</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Centro de atencion</p>
                <p className="font-bold text-[#5F5F5F] hidden md:block">Motivo de consulta</p>
                <p className="font-bold text-[#5F5F5F]">Atencion</p>
                <p></p>
            </div>
    )
    
}