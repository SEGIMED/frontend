'use client'

import Image from "next/image";
import Link from 'next/link';
import { ApiSegimed } from '@/Api/ApiSegimed'
import { useEffect, useState } from "react";
import rutas from "@/utils/rutas";
import Cookies from "js-cookie";

import ruteActual from '../../../../../components/images/ruteActual.png'
import backChanges from '../../../../../components/images/backChanges.png'
import Consulta from "@/components/consulta/dataconsulta";
import InputConsulta from "@/components/consulta/inputconsulta";
import InputFile from "@/components/consulta/inputfile";

import config from "@/components/localData/localdata";
import InputDiagnostico from "@/components/consulta/inputDiagnostico";
import InputExam from "@/components/consulta/inputExam";

import Component from "@/components/consulta/inputCuerpo";
import { useForm, FormProvider } from "react-hook-form"
import { useAppSelector } from "@/redux/hooks";



const DetallePaciente = (id) => {

    const userId = id.params.id

    const [patient, setPatient] = useState();

    const methods = useForm()
    const formState = useAppSelector(state => state.formSlice.selectedOptions)
    const onSubmit = (data) => console.log(data)


    useEffect(() => {
        const headers = config.headers
        const token = Cookies.get("a");
        const fetchData = async () => {
            try {
                const response = await ApiSegimed.get(`/patient-details/${userId}`, { headers: { 'token': token } });


                // Crear una promesa que se resuelve después de 1 segundo
                const delay = new Promise(resolve => setTimeout(resolve, 100));

                // Esperar tanto la respuesta de la API como el delay
                await Promise.all([response, delay]);

                setPatient(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);

            }
        };

        fetchData();
    }, []);




    if (!userId) {
        return <div>Cargando...</div>;
    }

    return (
        <FormProvider {...methods}>

            <div className="h-full  flex flex-col">
                <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-b-[#cecece]">
                    <div className='flex items-center '>
                        <Image src={ruteActual} alt="ruta actual" />
                        <p className="text-lg font-normal leading-6 text-[#5F5F5F] ">Detalle de consulta</p>
                    </div>
                    <div>
                        <Link href={`${rutas.Doctor}${rutas.Historial}`}>
                            <button className="flex rounded-lg items-center  px-6 py-2 font-bold text-sm leading-5 bg-[#487FFA] text-white gap-1 "><Image src={backChanges} alt='regresar' />Regresar</button>
                        </Link>
                    </div>
                </div>
                <form onChange={methods.handleSubmit(onSubmit)}>
                    <Consulta title={"Datos del paciente"} paciente={patient} />
                    <InputConsulta title={"Antecedentes"} risk={["Riesgo cardiovascular", "Riesgo quirúrgico", "Grupo HTP"]}
                        options={["Bajo", "Medio", "Alto", " Muy Alto"]}
                        subtitle={["Antecedentes quirúrgicos", "Antecedentes patologicos", "Antecedentes no patologicos", "Antecedentes familiares", "Antecedentes de infancia", "Alergias", "Medicamentos actuales", "Vacunas"]}
                    />
                    <InputConsulta title={"Anamnesis"} subtitle={["Motivo de consulta", "Evolucion de la enfermedad", "Sintomas"]} />
                    <Consulta title={"Signos vitales"} paciente={patient} />
                    <Component title={"Exploracion fisica"} />
                    <InputExam title={"Examen fisico"} />
                    <InputConsulta title={"Comentarios"} subtitle={["Anotaciones"]} />
                    <InputFile title={"Estudios"} />
                    <InputConsulta title={"Evolucion"} subtitle={["Anotaciones de la consulta"]} />
                    <InputDiagnostico title={"Diagnósticos y tratamiento"} subtitle={["Conducta terapeutica", "Medicamentos", "Procedimientos"]} subtitle2={["Diagnostico", "Medicamento", "Procedimiento"]} />
                </form>
            </div>
        </FormProvider>
    );
};

export default DetallePaciente;