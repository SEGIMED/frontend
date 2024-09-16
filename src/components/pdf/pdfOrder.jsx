'use client'

import React from 'react';
import LogoSegimed from '../logo/LogoSegimed';
import { Fecha } from '@/utils/NormaliceFechayHora';
import images from '../../components/images/images.png'
import Image from 'next/image';

import IconDownload from '../icons/IconDownload';

const PDFExportComponent = ({ data, user, drugs, patient }) => {
    // const handleGeneratePDF = () => {
    //     const element = document.getElementById('pdf-content');

    //     const opt = {
    //         margin: 0,
    //         filename: 'reporte.pdf',
    //         image: { type: 'png', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', orientation: 'portrait' },
    //         pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '.page-break' }
    //     };

    //     // Genera el PDF y devuelve un Blob
    //     html2pdf().from(element).set(opt).save()

    // };
    const date = new Date()

    const specialtiesString = user?.specialties?.map(specialty => specialty.name).join(', ');
    return (
        <div>
            <div className='h-[100%]'>
                <div className='hidden'>
                    <div id="pdf-content" className='flex flex-col text-[#333] pl-6 pr-6 pt-2 pb-2 '>
                        <div className='flex flex-col h-[100%]'>
                            <div className='flex justify-between h-[5rem]'>
                                {/* <img src={logo} alt='segimed' /> */}
                                <div className='justify-center flex items-center h-full '>
                                    <LogoSegimed className={'w-40'} />
                                </div>

                                <div className='text-base font-medium text-center'>
                                    <p>{user?.name} {user?.lastname}</p>
                                    <p>{specialtiesString}</p>
                                    <p>Matrícula Nac. :  {user?.medicalRegistries?.Nacional?.registryId} </p>
                                </div>
                                <div className='flex flex-col justify-around'>
                                    <p className='text-bluePrimary'>www.segimed.com</p>
                                    <div className='mt-3 flex justify-end'>Fecha :  {Fecha(date)}</div>
                                </div>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 h-[10rem] justify-center flex flex-col'>
                                <p><strong>Paciente : </strong> {patient?.name} {patient?.lastname}</p>
                                <p><strong>Fecha de nacimiento :  </strong>{patient?.sociodemographicDetails?.birthDate} </p>
                                <p><strong>D.N.I. : </strong>{patient?.sociodemographicDetails?.birthDate} </p>
                                <p><strong>Sexo : </strong>{patient?.sociodemographicDetails?.genre}</p>
                                <p><strong>Cobertura médica : </strong>{patient?.sociodemographicDetails?.healthCarePlan}</p>
                                <p><strong>Numero de cobertura médica : </strong>{patient?.sociodemographicDetails?.healthCarePlan}</p>
                                <p><strong>Telefono : </strong>{patient?.cellphone}</p>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 flex flex-col gap-[8rem] h-[30rem] justify-start'>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl'><strong>Rp : </strong></p>
                                    {drugs?.map((drug, index) => (
                                        <div key={index}>
                                            <p>{drug.drugCreation?.commercialDrugName} - {drug.drugCreation?.dose} {drug.drugCreation?.measureUnitId2}</p>
                                            <p>Cantidad: {drug.prescriptionCreation?.doseMeasure} cada {drug.prescriptionCreation?.timeMeasure} {drug.prescriptionCreation?.timeMeasureType}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl'><strong>Diagnóstico : </strong></p>
                                    <p>{data?.diagnostic2?.code} - {data?.diagnostic2?.description}</p>
                                </div>
                            </div>
                            <div className='w-[100%] flex'>
                                <div className='flex flex-col justify-center  w-[50%] font-semibold '>
                                    <div className='flex justify-around items-end'>
                                        <div>
                                            <p>{user?.name} {user?.lastname}</p>
                                            <p>{specialtiesString} </p>
                                        </div>
                                        {/* <Image
                                            src={images}
                                            alt='firma'
                                            className='w-[50%]'
                                        /> */}
                                    </div>

                                    <hr className='mt-5 border-dashed border-black' />
                                    <p className='text-center'>FIRMA Y SELLO</p>
                                </div>
                                <div className='flex flex-col justify-center items-center  w-[50%] font-semibold mb-5'>
                                    <p>Matrícula Nac. : {user?.medicalRegistries?.Nacional?.registryId} </p>
                                    <p>Matrícula Prov. : {user?.medicalRegistries?.Provincial?.registryId} </p>
                                </div>
                            </div>


                            <hr className='mt-5 solid border-black' />
                        </div>
                        <div className="page-break"></div>
                        <div className='flex flex-col h-[100%]'>
                            <div className='flex justify-between h-[5rem] w-full'>
                                <div className='justify-center flex items-center h-full '>
                                    <LogoSegimed className={'w-40'} />
                                </div>

                                <div className='text-base font-medium text-center '>
                                    <p>{user?.name} {user?.lastname}</p>
                                    <p>{specialtiesString}</p>
                                    <p>Matrícula Nac. :  {user?.medicalRegistries?.Nacional?.registryId} </p>
                                </div>
                                <div className='flex flex-col justify-around'>
                                    <p className='text-bluePrimary'>www.segimed.com</p>
                                    <div className='mt-3 flex justify-end'>Fecha :  {Fecha(date)}</div>
                                </div>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 h-[10rem] justify-center flex flex-col'>
                                <p><strong>Paciente : </strong>{patient?.name} {patient?.lastname}</p>
                                <p><strong>Fecha de nacimiento :  </strong>{patient?.sociodemographicDetails?.birthDate} </p>
                                <p><strong>D.N.I. : </strong>{patient?.sociodemographicDetails?.birthDate} </p>
                                <p><strong>Sexo : </strong>{patient?.sociodemographicDetails?.genre}</p>
                                <p><strong>Cobertura médica : </strong>{patient?.sociodemographicDetails?.healthCarePlan}</p>
                                <p><strong>Numero de cobertura médica : </strong>{patient?.sociodemographicDetails?.healthCarePlan}</p>
                                <p><strong>Telefono : </strong>{patient?.cellphone}</p>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 flex flex-col gap-7 h-[30rem] justify-start'>
                                <div className='gap-3 flex flex-col'>
                                    <p className='text-xl'><strong>Indicaciones</strong></p>
                                    {drugs?.map((drug, index) => (
                                        <div key={index}>

                                            <p>{drug.drugCreation?.commercialDrugName} - {drug.prescriptionCreation?.indications}</p>
                                        </div>
                                    ))}
                                </div>



                            </div>
                            <div className='w-[100%] flex'>
                                <div className='flex flex-col justify-center  w-[50%] font-semibold '>
                                    <div className='flex justify-around items-end'>
                                        <div>
                                            <p>{user?.name} {user?.lastname}</p>
                                            <p>{specialtiesString} </p>
                                        </div>
                                        {/* <Image
                                            src={images}
                                            alt='firma'
                                            className='w-[50%]'
                                        /> */}
                                    </div>

                                    <hr className='mt-5 border-dashed border-black' />
                                    <p className='text-center'>FIRMA Y SELLO</p>
                                </div>
                                <div className='flex flex-col justify-center items-center  w-[50%] font-semibold mb-5'>
                                    <p>Matrícula Nac. : {user?.medicalRegistries?.Nacional?.registryId} </p>
                                    <p>Matrícula Prov. : {user?.medicalRegistries?.Provincial?.registryId} </p>
                                </div>
                            </div>

                            <hr className='mt-5 solid border-black' />
                        </div>

                    </div>
                </div>
            </div>
            {/* <button onClick={handleGeneratePDF} className="bg-bluePrimary text-white py-2 px-4 items-center flex rounded-lg gap-2 ">
                <IconDownload />

            </button> */}
        </div >
    );
};

export default PDFExportComponent;
