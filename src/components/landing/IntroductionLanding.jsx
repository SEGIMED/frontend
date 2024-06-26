import IconAlarm from "../icons/IconAlarm";
import IconCaduceo from "../icons/IconCaduceo";
import IconCalendar from "../icons/IconCalendar";
import IconMessage from "../icons/IconMessage";
import IconRecord from "../icons/IconRecord";

const IntroductionLanding = () => {

    return (
        <div className="w-screen flex flex-col bg-white py-20  shadow-xl">
            <div className="flex flex-col text-center text-[#234C91] gap-10 mx-56">
                <div className="flex justify-center">
                    <IconCaduceo className="w-20"/>
                </div>
                <div className="font-semibold text-4xl">
                    <p>Tu bienestar es nuestra prioridad</p>
                </div>
                <div className="text-xl">
                    <p>En cualquier lugar del mundo, tu salud y bienestar son nuestra prioridad. Con nuestro equipo de médicos de primera y tu historial clínico accesible en todo momento, garantizamos una atención médica inmediata y de alta calidad. Confía en nosotros para cuidar de ti, porque tu tranquilidad es lo más importante.</p>
                </div>
            </div>
            <div className="grid grid-cols-2 content-center mx-56 gap-10 text-[#234C91] text-xs ">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex justify-center">
                        <IconMessage className="w-10"/>
                    </div>
                    <div className="font-bold">
                        Intercomunicación directa 
                        <span className="font-normal"> A través de chats y llamadas con tus médicos de preferencia donde quiera que estés.</span>                        
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div>
                        <IconCalendar className="w-10"/>
                    </div>
                    <div className="font-bold">
                        Agenda citas
                        <span className="font-normal"> Con nuestro sistema de forma rápida y eficiente, garantizando así un proceso sin complicaciones.</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div>
                        <IconAlarm className="w-10"/>
                    </div>
                    <div className="font-bold">
                        Sistema de alarmas
                        <span className="font-normal"> Conectado a dispositivos médicos que le permiten al grupo médico actuar con rapidez para prevenir y controlar tu salud.</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div>
                        <IconRecord className="w-10"/>
                    </div>
                    <div className="font-bold">
                        Crea tu historial médico,
                        <span className="font-normal"> Usalo y compártelo con tu grupo de medico de manera fácil, rapida y segura.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroductionLanding;