import { isUserUsingMobile } from "@/utils/checkMobile";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import React from "react";

export default function Privacy({ isOpen, onOpenChange, onAccept }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      scrollBehavior={"inside"}
      isKeyboardDismissDisabled={true}
      size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Política de Privacidad de Segimed
            </ModalHeader>
            <ModalBody>
              <p className="mb-4">
                Bienvenido a la Política de Privacidad de Segimed. En Segimed,
                nos preocupamos profundamente por la privacidad y la seguridad
                de la información de nuestros usuarios, tanto médicos como
                pacientes. Esta política detalla cómo recopilamos, utilizamos,
                compartimos y protegemos la información personal cuando utiliza
                nuestra aplicación móvil y/o aplicación web Segimed, diseñada
                para el seguimiento médico, la gestión de la salud personal y la
                telemedicina. Al utilizar nuestra aplicación, usted acepta los
                términos descritos en esta política.
              </p>

              <section id="introduction" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">1. Introducción</h2>
                <p>
                  En esta Política de Privacidad, explicamos cómo recopilamos y
                  tratamos la información personal de médicos y pacientes que
                  utilizan Segimed. Detallamos qué datos recopilamos, cómo los
                  utilizamos, con quién los compartimos y cómo protegemos su
                  privacidad y seguridad.
                </p>
                <p className="font-semibold mt-4">Declaración de Privacidad</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>¿Para qué recogemos tus datos personales?</li>
                  <li>
                    ¿Quién es el responsable por el tratamiento de tus datos
                    personales?
                  </li>
                  <li>¿A quién compartimos tus datos?</li>
                  <li>¿Por cuánto tiempo almacenamos tus datos personales?</li>
                  <li>¿Cómo puedes configurar tus datos?</li>
                  <li>¿Cuáles son tus deberes y derechos?</li>
                  <li>
                    ¿Por qué ves información de otros sitios en Mercado Libre?
                  </li>
                  <li>¿Cuáles son las leyes en tu país?</li>
                </ul>
                <p className="mt-4">
                  En Argentina todo paciente tiene derecho a saber sobre su
                  estado de salud y los posibles tratamientos. Puede decidir si
                  quiere recibir o no los tratamientos que prolonguen su vida
                  artificialmente.
                  <br />
                  Ley 26.529
                </p>
                <p className="mt-4 font-semibold">
                  Cambios en la Declaración de Privacidad
                </p>
                <p>
                  Nos reservamos el derecho de actualizar esta política en
                  cualquier momento. Las versiones anteriores de la Declaración
                  de Privacidad estarán disponibles para consulta.
                </p>
              </section>

              <section id="information-collected" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  2. Información que Recopilamos
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  2.1 Información de Registro y Cuenta
                </h3>
                <p>
                  Cuando se registra en Segimed como médico o paciente,
                  recopilamos información básica necesaria para crear y
                  gestionar su cuenta. Esto incluye datos personales como nombre
                  completo, lugar de nacimiento, lugar de residencia, dirección
                  de correo electrónico, dirección de domicilio, fecha de
                  nacimiento, género, cobertura médica, y en el caso de los
                  médicos los datos personales, matrículas o ID médicos, número
                  de seguro médico, detalles del lugar de atención, la práctica
                  médica y especialización.
                </p>

                <h3 className="text-lg font-semibold mt-4">
                  2.2 Datos Médicos y de Salud
                </h3>
                <p>
                  Segimed permite a los pacientes ingresar todos sus datos
                  médicos, estudios, resultados, e información necesaria para la
                  atención médica, así como condiciones de salud, medicamentos,
                  historial de procedimientos, alergias y cualquier otra
                  información relevante que la aplicación o su grupo de médicos
                  considere necesaria. Los médicos pueden acceder a esta
                  información para proporcionar un tratamiento más preciso y
                  personalizado.
                </p>

                <h3 className="text-lg font-semibold mt-4">
                  2.3 Información de Dispositivo y Uso
                </h3>
                <p>
                  Recopilamos información sobre el dispositivo que utiliza para
                  acceder a Segimed, como el tipo de dispositivo móvil, sistema
                  operativo, ubicación, geolocalización, identificadores únicos
                  de dispositivo y registros de actividad dentro de la
                  aplicación. Esta información nos ayuda a mejorar la
                  experiencia del usuario y la funcionalidad de la aplicación.
                </p>

                <h3 className="text-lg font-semibold mt-4">
                  2.4 Ubicación en Tiempo Real
                </h3>
                <p>
                  Para mejorar la funcionalidad de la aplicación y facilitar
                  servicios como la geolocalización de servicios médicos
                  cercanos, Segimed puede recopilar y utilizar su ubicación en
                  tiempo real mientras utiliza la aplicación. Esta funcionalidad
                  puede ser desactivada en la configuración de la aplicación.
                </p>

                <h3 className="text-lg font-semibold mt-4">
                  2.5 Cookies y Tecnologías Similares
                </h3>
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar la
                  experiencia del usuario y personalizar el contenido dentro de
                  Segimed. Las cookies son pequeños archivos de texto que se
                  almacenan en su dispositivo y nos ayudan a recordar sus
                  preferencias y ajustes de sesión. Puede configurar su
                  navegador para rechazar todas las cookies o para indicar
                  cuándo se envía una cookie. Sin embargo, algunas funciones de
                  Segimed pueden no funcionar correctamente si las cookies están
                  deshabilitadas.
                </p>
              </section>

              <section id="use-of-information" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  3. Uso de la Información
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  3.1 Propósitos del Uso de la Información
                </h3>
                <p>
                  Utilizamos la información recopilada para los siguientes
                  propósitos:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Provisión de Servicios Médicos: Somos una plataforma que le
                    permite a medios y pacientes interconectar para el propósito
                    del seguimiento médico, proporcionando a los pacientes y
                    médicos las herramientas necesarias para que se presente la
                    atención como el seguimiento médico, la gestión de la salud
                    personal y la realización de consultas de telemedicina.
                  </li>
                  <li>
                    Análisis de los datos: Analizamos los datos para mejorar la
                    funcionalidad de Segimed, brindando a los médicos toda la
                    información posible para que el servicio médico sea de
                    manera excelente, ágil, rápida y proporcione información
                    vital para la toma de decisiones.
                  </li>
                  <li>
                    Comunicación: Facilitamos la comunicación entre médicos y
                    pacientes a través de mensajes seguros, encintados, a través
                    del sistema de chats, teleconsultas, videoconferencias o
                    videollamadas, y otras notificaciones relacionadas con el
                    tratamiento médico, citas, turnos y recordatorios.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-4">
                  3.2 Análisis y Desarrollo
                </h3>
                <p>
                  Realizamos análisis de datos para comprender mejor cómo los
                  usuarios interactúan con Segimed. Este análisis nos permite
                  mejorar continuamente nuestros servicios y adaptarlos a las
                  necesidades específicas de médicos y pacientes, usando paneles
                  estadísticos e interpretativos.
                </p>
              </section>

              <section id="video-calls" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  4. Video Llamadas y Telemedicina
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  4.1 Videollamadas Médicas
                </h3>
                <p>
                  Segimed facilita videollamadas entre médicos y pacientes como
                  parte de sus servicios de telemedicina. Estas videollamadas
                  son cifradas y se llevan a cabo dentro de la aplicación para
                  garantizar la privacidad y confidencialidad de la información
                  médica y no almacena las llamadas o los videos para mantener
                  el secreto médico de la consulta.
                </p>
              </section>

              <section id="information-sharing" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  5. Compartición de Información
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  5.1 Con quién compartimos su Información
                </h3>
                <p>
                  No vendemos ni alquilamos información personal a terceros. Sin
                  embargo, compartimos información en las siguientes
                  circunstancias:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Proveedores de Servicios en salud: Trabajamos con centros y
                    proveedores que nos ayudan a analizar, estudiar y generar
                    acciones para proporcionar, mantener, proteger y promover un
                    bienestar en salud de calidad.
                  </li>
                  <li>
                    Médicos y Pacientes: La información médica puede ser
                    compartida entre médicos y pacientes dentro de Segimed para
                    facilitar el tratamiento médico y la gestión de la salud.
                  </li>
                  <li>
                    Cumplimiento Legal y Seguridad: Cumplimos con las leyes
                    aplicables de protección de datos y cooperamos con las
                    autoridades legales en caso de solicitudes legales válidas.
                  </li>
                </ul>
              </section>

              <section id="information-security" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  6. Seguridad de la Información
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  6.1 Medidas de Seguridad
                </h3>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas
                  adecuadas para proteger la información personal de usuarios
                  contra el acceso no autorizado, la pérdida, la destrucción y
                  la alteración. Sin embargo, ninguna medida de seguridad es
                  infalible y no podemos garantizar la protección absoluta de
                  los datos.
                </p>
              </section>

              <section id="user-rights" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  7. Derechos del Usuario
                </h2>
                <h3 className="text-lg font-semibold mt-4">
                  7.1 Acceso y Control de la Información
                </h3>
                <p>
                  Tiene el derecho de acceder, corregir o eliminar su
                  información personal en cualquier momento. Puede realizar
                  estas solicitudes contactándonos a través de los canales de
                  soporte disponibles en la aplicación.
                </p>

                <h3 className="text-lg font-semibold mt-4">
                  7.2 Opciones de Configuración
                </h3>
                <p>
                  Puede ajustar la configuración de privacidad en la aplicación
                  para controlar qué información comparte y cómo se utiliza.
                  También puede optar por desactivar ciertas funciones si no
                  desea compartir datos específicos.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">8. Contacto</h2>
                <p>
                  Si tiene preguntas sobre esta Política de Privacidad o sobre
                  cómo manejamos su información personal, puede ponerse en
                  contacto con nosotros en:
                </p>
                <p className="font-semibold mt-2">Email: soporte@segimed.com</p>
                <p className="font-semibold mt-2">Teléfono: 0800-123-4567</p>
                <p className="font-semibold mt-2">
                  Dirección: Av. Siempre Viva 123, Ciudad, País
                </p>
              </section>
            </ModalBody>
            <ModalFooter className="justify-around">
              <Button
                color="primary"
                className="text-xl"
                variant="light"
                onPress={() => {
                  onAccept(), onClose();
                }}>
                Aceptar
              </Button>
              <Button
                color="danger"
                className="text-xl"
                variant="light"
                onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
