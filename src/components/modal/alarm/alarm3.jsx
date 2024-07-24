import IconAlarmRed from "@/components/icons/iconAlarmRed";
import IconAlarmYellow from "@/components/icons/IconAlarmYellow";
import IconAlarmGreen from "@/components/icons/iconAlarmGreen";


export default function Alarm3() {
    return (
        <div className=" w-full flex flex-col items-center justify-center gap-3">
            <p className="font-normal text-xl leading-7 text-center">
                El sistema de alarmas de Segimed es un sistema prioritario de aviso de su condición médica
            </p>
            <div className="flex gap-3 ">
                <div className="w-[34%] text-center items-center justify-center flex flex-col">
                    <IconAlarmRed className={"w-20 h-20"} />
                    <p className="text-[#E73F3F] font-semibold text-base leading-6">Prioridad Alta</p>
                    <p>Tiempo promedio de respuesta:
                        <p className="text-bluePrimary">  Menos de 12 horas</p></p>
                </div>
                <div className="w-[34%] text-center items-center justify-center flex flex-col">
                    <IconAlarmYellow className={"w-20 h-20"} />
                    <p className="text-[#FFC900] font-semibold text-base leading-6">Prioridad Media</p>
                    <p>Tiempo promedio de respuesta:
                        <p className="text-bluePrimary">    De 12 a 48 horas</p></p>
                </div>
                <div className="w-[34%] text-center items-center justify-center flex flex-col">
                    <IconAlarmGreen className={"w-20 h-20"} />
                    <p className="text-[#70C247] font-semibold text-base leading-6">Prioridad Baja</p>
                    <p>Tiempo promedio de respuesta:
                        <p className="text-bluePrimary">    Más de 48 horas</p></p>
                </div>
            </div>
        </div>
    );
}
