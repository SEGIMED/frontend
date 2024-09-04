import IconAutoevaluacion from "@/components/icons/IconAutoEvaluacion";
import IconVitalSings from "@/components/icons/IconVitalSings";

export default function ModalAutoEvaluacion({ setAutoevaluaciónType, autoEvaluacionType }) {
    return (
        <div className="w-full flex items-center gap-6 flex-col">
            <p className="font-medium text-3xl leading-10 text-center text-bluePrimary">
                ¿Qué deseas hacer?
            </p>
            <div className="flex-col flex gap-5 md:gap-4 md:flex md:flex-row">
                <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-start
                        ${autoEvaluacionType === 'SignosVitales'
                            ? 'bg-bluePrimary text-white'
                            : 'bg-white text-bluePrimary border-2 border-[#487ffa]'}`}
                    onClick={() => setAutoevaluaciónType('SignosVitales')}
                >
                    <IconVitalSings color={autoEvaluacionType === 'SignosVitales' ? 'white' : '#487ffa'} />
                    Completar signos vitales
                </button>
                <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2  text-start
                        ${autoEvaluacionType === 'AutoEvaluacion'
                            ? 'bg-bluePrimary text-white'
                            : 'bg-white text-bluePrimary border-2 border-[#487ffa]'}`}
                    onClick={() => setAutoevaluaciónType('AutoEvaluacion')}
                >
                    <IconAutoevaluacion color={autoEvaluacionType === 'AutoEvaluacion' ? 'white' : '#487ffa'} />
                    Realizar autoevaluación
                </button>
            </div>
        </div>
    );
}