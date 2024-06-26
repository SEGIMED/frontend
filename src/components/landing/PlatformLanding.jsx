import IconAppStore from "../icons/IconAppStore";
import IconPlatform from "../icons/IconPlatform";
import IconPlayStore from "../icons/IconPlayStore";

const PlatformLanding = () => {
    return (
        <div className="w-full ">
        <div className=" text-white grid grid-cols-2 px-20 pt-16 w-full bg-gradient-to-br from-[#8DB1FF] to-[#2060ED]">
          
          <div className="flex items-center justify-center w-full">
            <IconPlatform/>
          </div>
          
          <div className="flex flex-col justify-center gap-10 w-full px-10">

            <h1 className="text-5xl font-extrabold">
              LA PLATAFORMA
            </h1>

            <div className="flex flex-col gap-5 text-left"> 
              <p>
                SEGIMED se destaca como una plataforma médica interactiva de vanguardia, diseñada para facilitar una comunicación constante y directa entre el personal médico y sus pacientes. Esta herramienta innovadora establece un lazo sólido y accesible entre las partes, sin importar en qué lugar te encuentres.  
              </p>
              <p>
                A través de SEGIMED, se monitorea de cerca la salud y el progreso de las enfermedades, proporcionando respuestas a preguntas y preocupaciones, y ofreciendo apoyo humano caracterizado por su calidez y cordialidad. La plataforma se compromete a entregar un servicio de la más alta calidad, respaldado por un equipo de profesionales y expertos de primer nivel que garantizan que tú y tu familia reciban la atención más confiable y eficaz.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 text-xl font-bold">                                       
                <p>Próximamente descargar en:</p>

                <div className="flex items-center justify-center gap-5">
                  <IconAppStore/>
                  <IconPlayStore/>
                </div>
            </div> 
          </div>
                    
        </div>
      </div>
    )
};

export default PlatformLanding;