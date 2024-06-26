


import Avatars from '../avatar/avatarChat';
import LastLogin from "@/utils/lastLogin";

export default function DoctorCardConsulta({ doctor, button, consulta }) {
    const specialtiesString = doctor?.specialties?.map(specialty => specialty.name).join(' ');

    const getStatusTextAndColor = (status) => {
        switch (status) {
            case 1: // Agendada
                return { text: 'Agendada', color: 'text-[#686868]' }; // Color normal
            case 2: // Atendida
                return { text: 'Atendida', color: 'text-green-500' }; // Verde
            case 3: // Cancelada
                return { text: 'Cancelada', color: 'text-red-500' }; // Rojo
            case 4: // No atendida
                return { text: 'No atendida', color: 'text-red-500' }; // Rojo
            default:
                return { text: 'Desconocido', color: 'text-[#686868]' }; // Color por defecto
        }
    };

    const status = getStatusTextAndColor(consulta?.schedulingStatus);

    return (
        <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
            <div className="flex gap-3 items-center">
                <div className="w-12 h-12 flex justify-center items-center">
                    <Avatars avatar={doctor.avatar} />
                </div>
                <p className="text-start text-[#686868] font-normal text-base leading-6">{doctor?.name} {doctor?.lastname} - {specialtiesString ? specialtiesString : null}</p>
                <div className="flex gap-3 items-center justify-center text-center">
                <p className="text-center text-[#686868] font-normal text-base leading-6">{consulta?.reasonForConsultation}</p>
                <p className="text-center text-[#686868] font-normal text-base leading-6">{LastLogin(consulta?.scheduledStartTimestamp)}</p>
                <p className={`text-center font-normal text-base leading-6 ${status?.color}`}>{status?.text}</p>
                </div>
            </div>
            {button}
        </div>
    );
}
