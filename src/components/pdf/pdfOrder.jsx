'use client'

import React from 'react';
import LogoSegimed from '../logo/LogoSegimed';
import { Fecha } from '@/utils/NormaliceFechayHora';

const PDFExportComponent = ({ data }) => {
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
    //     html2pdf().from(element).set(opt).outputPdf('blob').then((pdfBlob) => {
    //         // Llama a la función de devolución de llamada con el PDF generado
    //         if (onPdfGenerated) {
    //             onPdfGenerated(pdfBlob);
    //         }
    //     });
    // };


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

                                <div className='text-base font-medium '>
                                    <p>{data?.physician?.name} {data?.physician?.lastname}</p>
                                    <p>especialidad falta</p>
                                    <p>Matrícula Nac. :  falta </p>
                                </div>
                                <div>
                                    <p className='text-bluePrimary'>www.segimed.com</p>
                                </div>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 h-[10rem] justify-center flex flex-col'>
                                <p><strong>Paciente : </strong>falta</p>
                                <p><strong>Fecha de nacimiento :  </strong>falta </p>
                                <p><strong>D.N.I. : </strong>falta </p>
                                <p><strong>Sexo : </strong>falta</p>
                                <p><strong>Cobertura médica : </strong> falta</p>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 flex flex-col gap-[8rem] h-[30rem] justify-start'>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl'><strong>Rp : </strong></p>
                                    <div>
                                        <p>{data?.lastModification?.commercialName?.name}-{data?.lastModification?.drugDetailPresentation?.dose}</p>
                                        <p>Cantidad :  {data?.lastModification?.doseMeasure} cada {data?.lastModification?.timeMeasure}{data?.lastModification?.timeMeasureType}</p>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl'><strong>Diagnóstico : </strong></p>
                                    <p>aca el diagnostico // falta</p>
                                </div>



                            </div>
                            <div className='flex flex-col justify-center w-[50%] font-semibold '>
                                <p>{data?.physician?.name} {data?.physician?.lastname}</p>
                                <p>Médico cardiologo // falta traer</p>
                                <p>Matrícula Nac. : </p>
                                <p>Matrícula Prov. :  </p>
                                <hr className='mt-5 border-dashed border-black' />
                                <p className='text-center'>FIRMA Y SELLO</p>
                            </div>
                            <div className='mt-3 flex justify-end'>Fecha :  {Fecha(data?.lastModification?.modificationTimestamp)}</div>
                            <hr className='mt-5 solid border-black' />
                        </div>
                        <div className="page-break"></div> {/* Este es el salto de página */}
                        <div className='flex flex-col h-[100%]'>
                            <div className='flex justify-between h-[5rem] w-full'>
                                <div className='justify-center flex items-center h-full '>
                                    <LogoSegimed className={'w-40'} />
                                </div>

                                <div className='text-base font-medium '>
                                    <p>{data?.physician?.name} {data?.physician?.lastname}</p>
                                    <p>especialidad falta</p>
                                    <p>Matrícula Nac. :  falta </p>
                                </div>
                                <div>
                                    <p className='text-bluePrimary'>www.segimed.com</p>
                                </div>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 h-[11rem] justify-center flex flex-col'>
                                <p><strong>Paciente  : </strong></p>
                                <p><strong>Fecha de nacimiento  : </strong> </p>
                                <p><strong>D.N.I.  : </strong></p>
                                <p><strong>Sexo  : </strong> </p>
                                <p><strong>Cobertura médica  : </strong> </p>
                            </div>
                            <hr className='mt-5 solid border-black' />
                            <div className='mt-5 mb-5 flex flex-col gap-7 h-[30rem] justify-start'>
                                <div className='gap-3 flex flex-col'>
                                    <p className='text-xl'><strong>Indicaciones</strong></p>

                                    <p>{data?.lastModification?.indications} </p>
                                </div>



                            </div>
                            <div className='flex flex-col justify-center w-[50%] font-semibold '>
                                <p>{data?.physician?.name} {data?.physician?.lastname}</p>
                                <p>Médico cardiologo // falta traer</p>
                                <p>Matrícula Nac. : </p>
                                <p>Matrícula Prov. :  </p>
                                <hr className='mt-5 border-dashed border-black' />
                                <p className='text-center'>FIRMA Y SELLO</p>
                            </div>
                            <div className='mt-3 flex justify-end'>Fecha :  {Fecha(data?.lastModification?.modificationTimestamp)}</div>
                            <hr className='mt-5 solid border-black' />
                        </div>

                    </div>
                </div>
            </div>
            {/* <button onClick={handleDownloadPDF} className="bg-bluePrimary text-white py-2 px-4 items-center flex rounded-lg gap-2 ">
                <IconDownload />

            </button> */}
        </div >
    );
};

export default PDFExportComponent;
