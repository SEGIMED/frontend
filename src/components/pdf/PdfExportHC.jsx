'use client'

import React from 'react';
import LogoSegimed from '../logo/LogoSegimed';
import { Fecha } from '@/utils/NormaliceFechayHora';
import Image from 'next/image';
import IconDownload from '../icons/IconDownload';
import ButtonBlancoBorde from '../Buttons/ButtonBlancoBorder';
import IconImportar from '../icons/IconImportar';
import AvatarDashPte from '../avatar/avatarDashPte';

const PDFExportHC = ({ patient, consultas, data, user, drugs }) => {
    const handleGeneratePDF = async () => {
        if (typeof window === 'undefined') {
            return;
        }

        // Importar html2pdf dinámicamente
        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.getElementById('pdf-content');

        const opt = {
            margin: 0,
            filename: `${patient.name}${patient.lastname}HistoriaClinica.pdf`,
            image: { type: 'jpeg', quality: 0.7 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '.page-break' }
        };

        // Genera el PDF y devuelve un Blob
        html2pdf().from(element).set(opt).save();
    };

    const date = new Date();

    const findVitalSign = (vitalSigns, signName) => {
        const vital = vitalSigns.find(
            (v) => v.vitalSignMeasureType?.name === signName
        );
        return vital ? vital.measure : 'No registrado';
    };

    return (
        <div>
            <div className='h-[100%]'>
                <div className='hidden'>
                    <div id="pdf-content" className='flex flex-col text-[#333] pl-6 pr-6 pt-2 pb-2 '>
                        <div className='flex flex-col h-[100%]'>
                            {/* Header */}
                            <div id='header' className='header flex justify-between items-center h-[5rem]'>
                                <div className='justify-center flex items-center h-full '>
                                    <LogoSegimed className={'w-40'} />
                                </div>
                                <div className='text-base font-medium text-center'>
                                    <p className='text-2xl'>Historia clínica del paciente</p>
                                </div>
                                <div className='flex flex-col justify-around'>
                                    <p className='text-bluePrimary'>www.segimed.com</p>
                                    <div className='mt-3 flex justify-end'>Fecha : {Fecha(date)}</div>
                                </div>
                            </div>
                            <hr className='mt-5 solid border-black' />

                            {/* Datos del paciente */}
                            <div className='mt-5 h-[10rem] flex flex-col'>
                                <p className='text-xl text-center'><strong>Datos del paciente: </strong></p>
                                <div className='flex gap-4 pt-4 items-center'>
                                    <Image
                                        src={patient?.avatar || '/default-avatar.jpg'}
                                        alt="Avatar del paciente"
                                        width={140}
                                        height={140}
                                        className="rounded-full "
                                        style={{ borderRadius: '100%' }}
                                    />
                                    <div className='flex justify-start  flex-col'>
                                        <p><strong>Nombre : </strong> {patient?.name} {patient?.lastname}</p>
                                        <p><strong>Fecha de nacimiento : </strong>{patient?.socDemDet?.birthDate} </p>
                                        <p><strong>Médico tratante : </strong>{patient?.sociodemographicDetails?.birthDate} </p>
                                        <p>
                                            <strong>Grupo HTP: </strong>
                                            {patient?.userHpGroups?.map(group => group?.catHpGroup?.name).join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Antecedentes */}
                            <div className='mt-5 mb-5 flex flex-col  justify-start'>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl text-center'><strong>Antecedentes : </strong></p>
                                    <div className='flex justify-between h-[40rem] flex-col '>
                                        <p><strong>Riesgo cardiovascular : </strong> {patient?.ptCvRsks?.catCvRisk?.name} </p>
                                        <p><strong>Riesgo quirúrgico : </strong>{patient?.patSgRisks?.catSurgicalRisk?.name}  </p>
                                        <p><strong>Antecedentes quirúrgicos : </strong>{patient?.backgrounds?.surgicalBackground}  </p>
                                        <p><strong>Antecedentes patológicos : </strong>{patient?.backgrounds?.pathologicBackground}</p>
                                        <p><strong>Antecedentes no patológicos : </strong>{patient?.backgrounds?.nonPathologicBackground}  </p>
                                        <p><strong>Antecedentes familiares : </strong>{patient?.backgrounds?.familyBackground}</p>
                                        <p><strong>Antecedentes de juventud : </strong>{patient?.backgrounds?.pediatricBackground}</p>
                                        <p><strong>Medicación actual : </strong>{patient?.backgrounds?.pharmacologicalBackground}</p>
                                        <p><strong>Alergias : </strong>{patient?.backgrounds?.allergicBackground}</p>
                                        <p><strong>Vacunas : </strong>{patient?.backgrounds?.vaccinationBackground}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Página nueva */}
                            <div className="page-break"></div>
                            {patient?.history?.map((consulta, index) => (
                                <div key={index} className='flex flex-col h-[100%]'>
                                    <div className='mt-5 mb-5 flex flex-col  justify-start'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-xl text-center'><strong>Consulta : {Fecha(consulta?.extraData?.appSch?.scheduledStartTimestamp)} </strong></p>
                                            <div className='flex justify-start flex-col gap-2'>
                                                <div className='flex justify-start flex-col gap-1'>

                                                    <p className='text-xl mb-1'><strong>Anamnesis : </strong></p>
                                                    <p>Evolución de la enfermedad : {consulta?.event?.consultation?.anamnesis || 'No disponible'}   </p>
                                                    <p>Motivo de la consulta : {consulta?.event?.consultation?.diagnostic?.reasonForConsultation?.description || 'No disponible'}</p>
                                                    <p>Medico : {consulta?.extraData?.appSch?.physicianThatAttend?.name} {consulta?.extraData?.appSch?.physicianThatAttend?.lastname}</p>
                                                </div>
                                                <div className='flex justify-start flex-col gap-1' >
                                                    <p className='text-xl mt-1 mb-1'><strong>Signos vitales : </strong></p>
                                                    <p>Estatura : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Estatura')}</p>
                                                    <p>Peso : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Peso')}</p>
                                                    <p>Índice de masa corporal : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'IMC')}</p>
                                                    <p>Temperatura : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Temperatura')}</p>
                                                    <p>Frecuencia cardíaca : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Frecuencia Cardiaca')}</p>
                                                    <p>P.A. Sistólica : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Presión Arterial Sistólica')}</p>
                                                    <p>P.A. Diastólica : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Presión Arterial Diastólica')}</p>
                                                    <p>Frecuencia respiratoria : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Frecuencia Respiratoria')}</p>
                                                    <p>Saturación de oxígeno : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Saturación de Oxígeno')}</p>
                                                    <p>Clase funcional : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Clase Funcional')}</p>
                                                    <p>Glucemia fuera de los rangos normales : {findVitalSign(consulta.event?.consultation?.vitalSigns, 'Glucemia fuera de los rangos normales')}</p>
                                                </div>
                                                <div className='flex justify-start flex-col gap-1'>
                                                    <p className='text-xl mt-1 mb-2'><strong>Evolucion : </strong></p>
                                                    <p>{consulta.event?.consultation?.evolution || 'No disponible'} </p>

                                                </div>
                                                <div className='flex justify-start flex-col gap-1'>
                                                    <p className='text-xl mt-1 mb-1'><strong>Diagnosticos y tratamiento : </strong></p>
                                                    <p>Diagnósticos : {consulta.event?.consultation?.diagnostic?.mainDiagnostic?.description
                                                    } - {consulta.event?.consultation?.diagnostic?.medicalEventDiagnostics.map(item => item.cie10subCategory.description).join(' - ')}</p>
                                                    <p>
                                                        Procedimientos: {consulta.event?.consultation?.diagnostic?.procedurePrescriptions?.map(item => item.medicalProcedureName).join(' - ')}
                                                    </p>
                                                    <p>
                                                        Tratamiento no farmacológico: {consulta.event?.consultation?.diagnostic?.alarmPattern || 'No disponible'}
                                                    </p>
                                                    <p>
                                                        Pauta de alarma: {consulta.event?.consultation?.diagnostic?.alarmPattern || 'No disponible'}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))}

                            <div className='flex flex-col min-h-[7rem] justify-end items-center w-full font-semibold'>
                                <div className='flex flex-col justify-center items-center w-full'>

                                    <p>{user?.name} {user?.lastname}</p>
                                    <div className='flex justify-center items-center'>
                                        {user?.physicianSpecialties?.map((specialty, index) => (
                                            <span key={index}>
                                                {specialty.specialty.name}/
                                            </span>
                                        ))}
                                    </div>

                                    {/* Aquí podrías agregar la imagen de la firma */}
                                    {/* <Image src={images} alt='firma' className='w-[50%]' /> */}
                                </div>
                                <hr className='mt-5 border-dashed border-black w-[50%]' />
                                <p className='text-center'>FIRMA Y SELLO</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Botón para exportar el PDF */}
            <ButtonBlancoBorde
                text={"Exportar"}
                iconLeft={<IconImportar />}
                funcion={() => handleGeneratePDF()}
            />
        </div >
    );
};

export default PDFExportHC;
