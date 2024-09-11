import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import React from "react";

export default function Term({ isOpen, onOpenChange, onAccept }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      scrollBehavior={"inside"}
      isKeyboardDismissDisabled={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Políticas de Privacidad y Condiciones del Servicio de Segimed
            </ModalHeader>
            <ModalBody>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Tabla de Contenidos
                </h2>
                <ul className="list-disc pl-5">
                  <li>
                    <a href="#privacy-declaration">Declaración de privacidad</a>
                  </li>
                  <li>
                    <a href="#service-info">
                      Información sobre nuestros Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#privacy-policy">
                      Política de privacidad y datos del usuario
                    </a>
                  </li>
                  <li>
                    <a href="#acceptable-use">
                      Uso aceptable de nuestros Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#third-party-services">Servicios de terceros</a>
                  </li>
                  <li>
                    <a href="#licenses">Licencias</a>
                  </li>
                  <li>
                    <a href="#report-infringements">
                      Reporte de infracciones de derechos de autor, marca
                      comercial o propiedad intelectual
                    </a>
                  </li>
                  <li>
                    <a href="#disclaimers">
                      Descargos y exclusiones de responsabilidad
                    </a>
                  </li>
                  <li>
                    <a href="#limitation-liability">
                      Limitación de responsabilidad
                    </a>
                  </li>
                  <li>
                    <a href="#indemnification">Indemnización</a>
                  </li>
                  <li>
                    <a href="#dispute-resolution">Resolución de disputas</a>
                  </li>
                  <li>
                    <a href="#service-availability">
                      Disponibilidad y cancelación de servicios
                    </a>
                  </li>
                  <li>
                    <a href="#account-blocking">
                      Bloqueo y eliminación de cuentas
                    </a>
                  </li>
                  <li>
                    <a href="#conditions-update">
                      Actualización de las condiciones
                    </a>
                  </li>
                  <li>
                    <a href="#age-restrictions">
                      Restricciones de edad y responsabilidad del usuario
                    </a>
                  </li>
                </ul>
              </div>

              <section id="privacy-declaration" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Declaración de privacidad
                </h2>
                <p>
                  La Declaración de Privacidad es el documento legal que
                  disponemos para que conozcas cómo protegemos tus datos y cómo
                  te ofrecemos una experiencia personalizada. Esta Declaración
                  de Privacidad forma parte de los términos y condiciones. Tené
                  presente que prestar tu consentimiento voluntario, expreso e
                  informado a esta Declaración de Privacidad es un requisito
                  esencial para poder contratar y/o tener cualquier tipo de
                  relación con SEGIMED, dependiendo de la legislación aplicable
                  en cada país.
                </p>
              </section>

              <section id="service-info" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Información sobre nuestros Servicios
                </h2>
                <p>
                  Segimed es una plataforma virtual dedicada al seguimiento
                  médico, donde los pacientes y médicos puedan interconectarse
                  continuamente para disminuir índices de hospitalizaciones,
                  prevenir eventos graves y prevenir complicaciones, así como
                  para generar un mayor bienestar, tranquilidad y paz a los
                  usuarios. Segimed no presta directamente servicios de atención
                  médica, en cambio es un espacio para que los médicos y
                  entidades de salud que se puedan anexar brinden la atención
                  correspondiente mediante como telemedicina. Facilitamos el
                  acceso a servicios de salud a los pacientes generando la
                  facilidad de conectar con médicos y entidades de salud además
                  de generar un seguimiento continuo a través de dispositivos
                  médicos que se puedan vincular y que proporcionen los datos
                  que médicos y pacientes puedan, de manera segura y con todas
                  las medidas de confidencialidad necesarias para dicho fin.
                </p>
              </section>

              <section id="privacy-policy" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Política de privacidad y datos del usuario
                </h2>
                <p>
                  Respetamos la privacidad de nuestros usuarios y nos
                  comprometemos a proteger la información personal que
                  recopilamos. Nuestra Política de Privacidad detalla cómo
                  recopilamos, utilizamos, almacenamos y protegemos esta
                  información. Al utilizar Segimed, usted acepta explícitamente
                  el procesamiento de sus datos personales de acuerdo con
                  nuestra política. Cómo se recopilan los datos: médicos y
                  pacientes pueden entrar al apartado de antecedentes, datos
                  personales, historial cinco o cualquier campo que requiera
                  información para subir o rellenar, en el caso de los archivos
                  estos quedarán almacenados en una nube gestionada por una
                  empresa internacional. Dichos archivos también podrán
                  eliminarse de acuerdo a su requerimiento o petición por parte
                  del médico previo a un periodo establecido donde se podrán
                  hacer cambios, sin poder quedar registrados, o por parte del
                  administrador de la aplicación en caso de observarse un error,
                  inconsistencia o cualquier falla en el reporte del mismo
                  previamente verificado por el centro donde se realizó o el
                  laboratorio o estudio, o en su defecto en condiciones
                  especiales que lo permitan.
                </p>
              </section>

              <section id="acceptable-use" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Uso Aceptable de Nuestros Servicios
                </h2>
                <p>
                  Para mantener un entorno seguro y respetuoso, usted acepta
                  utilizar Segimed de manera consistente con todas las leyes y
                  regulaciones aplicables, los manuales de convivencia y
                  comportamiento, el respeto, y buen trato de usuarios a los
                  profesionales y viceversa. Esto incluye buena comunicación,
                  evitar palabras vulgares o soeces, evitar la confrontación y
                  discusiones acaloradas, el lenguaje tácito ofensivo directo o
                  indirecto, el uso correcto de emoticones, buen trato y no se
                  limita a, evitar conductas que interfieran con el
                  funcionamiento adecuado de la aplicación, violen los derechos
                  de otros usuarios o terceros, o constituyan actividades
                  ilegales según las leyes locales o internacionales.
                </p>
              </section>

              <section id="third-party-services" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Servicios de Terceros
                </h2>
                <p>
                  En ocasiones, Segimed puede integrar servicios de terceros
                  para mejorar la funcionalidad y experiencia del usuario. Estos
                  servicios pueden incluir herramientas de análisis, servicios
                  de almacenamiento en la nube, procesadores de pagos u otros
                  proveedores de servicios, opiniones de terceros en cuanto a la
                  toma de decisiones médicas para el bienestar del paciente
                  siempre y cuando no violen la privacidad o el secreto médico.
                  El uso de estos servicios está sujeto a los términos y
                  políticas de privacidad de los terceros correspondientes.
                </p>
              </section>

              <section id="licenses" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Licencias</h2>
                <p>
                  Segimed otorga a los usuarios una licencia limitada, no
                  exclusiva, revocable y no transferible para utilizar la
                  aplicación y sus servicios conforme a estos términos. Esta
                  licencia se concede únicamente para uso personal y no
                  comercial, y no implica la transferencia de derechos de
                  propiedad intelectual.
                </p>
              </section>

              <section id="report-infringements" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Reporte de Infracciones de Derechos de Autor, Marca Comercial
                  o Propiedad Intelectual
                </h2>
                <p>
                  Valoramos y respetamos los derechos de propiedad intelectual
                  de terceros. Si cree que su propiedad intelectual ha sido
                  utilizada de manera que constituya una infracción, le
                  alentamos a que nos contacte de inmediato para abordar la
                  situación conforme a las normativas legales aplicables.
                </p>
              </section>

              <section id="disclaimers" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Descargos y Exclusiones de Responsabilidad
                </h2>
                <p>
                  Segimed proporciona sus servicios "soporte" y "según
                  disponibilidad". No ofrecemos garantías explícitas o
                  implícitas sobre la precisión, confiabilidad o disponibilidad
                  continua de nuestros servicios. Usted acepta utilizar Segimed
                  bajo su propio riesgo y comprende que los resultados de la
                  telemedicina, el telemonitoreo, la observación a distancia,
                  las toma de decisiones de distintos médicos, la
                  interpretaciones de comunicaciones entre ambos las cuales
                  podrían mal interpretarse o no entenderse, pueden variar según
                  las circunstancias individuales y profesionales involucrados,
                  y Segimed no se hace responsable en dichos casos, así también
                  del mal o inadecuado uso de la aplicación, para evitar dichos
                  conflictos habrá un equipo de soporte vías de comunicación y
                  líneas telefónicas que permitan minimizar los errores y que
                  los usuarios están en el deber y derecho de usar.
                </p>
              </section>

              <section id="limitation-liability" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Limitación de Responsabilidad
                </h2>
                <p>
                  En la medida máxima permitida por la ley aplicable, Segimed no
                  será responsable por daños directos, indirectos, incidentales,
                  especiales, consecuentes o ejemplares que surjan del uso, mal
                  uso, o la imposibilidad de utilizar nuestros servicios por las
                  razones que sea. Esto incluye, entre otros, pérdida de
                  beneficios, datos, uso o cualquier otro tipo de pérdida
                  intangible, incluso si hemos sido advertidos sobre la
                  posibilidad de tales daños, tampoco se hace responsable de los
                  errores de los prestadores o terceros que presten el servicio
                  indirectamente a Segimed como administradores de nube o de
                  datos, centros médicos o médicos, seguros médicos, obras
                  sociales o cualquier entidad pública o privada que preste
                  servicios o se encuentre vinculados a las rutas del servicio
                  que presta Segimed.
                </p>
              </section>

              <section id="indemnification" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Indemnización</h2>
                <p>
                  Al utilizar Segimed, renuncia a su derecho de recibir
                  indemnizaciones y exime de responsabilidad a Segimed, sus
                  directores, empleados, agentes, socios, y afiliados de
                  cualquier reclamo o demanda, incluidos honorarios razonables
                  de abogados, realizados por terceros debido a su
                  incumplimiento de estos términos o a su violación de cualquier
                  ley o derechos de terceros.
                </p>
              </section>

              <section id="dispute-resolution" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Resolución de Disputas
                </h2>
                <p>
                  Cualquier disputa, controversia o reclamación que surja de o
                  en relación con estos términos se resolverá primero mediante
                  negociaciones de buena fe y diálogos con los directamente
                  vinculados. Si las partes no llegan a un acuerdo, aceptan
                  someterse a la jurisdicción exclusiva de los tribunales
                  competentes, eximiendo a Segimed de toda responsabilidad o
                  vinculación del pleito.
                </p>
              </section>

              <section id="service-availability" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Disponibilidad y Cancelación de Servicios
                </h2>
                <p>
                  Nos reservamos el derecho de modificar, suspender o cancelar
                  parte o la totalidad de nuestros servicios en cualquier
                  momento y sin previo aviso. Usted acepta que Segimed no será
                  responsable ante usted ni ante ningún tercero por cualquier
                  modificación, suspensión o interrupción de nuestros servicios.
                </p>
              </section>

              <section id="account-blocking" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Bloqueo y Eliminación de Cuentas
                </h2>
                <p>
                  Segimed se reserva el derecho de bloquear, suspender o
                  eliminar cuentas de usuario y contenido si determinamos, a
                  nuestra discreción, que el usuario ha infringido estos
                  términos mencionados o no en este documento o cualquier ley
                  aplicable. Esto puede incluir el uso no autorizado de la
                  aplicación, actividades fraudulentas, comportamiento abusivo,
                  publicación de contenido inapropiado o cualquier otra conducta
                  que viole nuestros estándares comunitarios.
                </p>
              </section>

              <section id="conditions-update" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Actualización de las Condiciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar o actualizar estos
                  términos en cualquier momento para reflejar cambios en la ley,
                  en nuestros servicios o en respuesta a comentarios de
                  usuarios. Publicaremos cualquier modificación significativa
                  dentro de la aplicación Segimed o mediante otros medios
                  apropiados. El uso continuado de nuestros servicios después de
                  dichas modificaciones constituirá su consentimiento para estar
                  sujeto a los términos revisados.
                </p>
              </section>

              <section id="age-restrictions" className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Restricciones de Edad y Responsabilidad del Usuario
                </h2>
                <p>
                  Segimed está destinado únicamente a usuarios mayores de 16
                  años con la supervisión de padres o familiares o la mayoría de
                  edad legal en su jurisdicción, ya que generalmente los médicos
                  de atención en adultos generan atención a estos desde los 16
                  años generalmente. Si un usuario es menor de edad, y hay una
                  solicitud expresa al equipo de Segimed firmada por un adulto
                  responsable, este puede hacerse cargo de la cuenta y será
                  responsable de supervisar su uso adecuado. Es responsabilidad
                  del usuario mantener la seguridad de su cuenta y notificar a
                  Segimed de inmediato sobre cualquier acceso no autorizado o
                  uso indebido de la cuenta.
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
