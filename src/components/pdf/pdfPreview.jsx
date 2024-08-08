"use client"

import CalcularEdad from '@/utils/calcularEdad';
import { useEffect, useRef } from 'react';

export default function PdfPreview ({ user }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const avatarUrl = user.avatar;
        const img = new Image();
        img.src = avatarUrl;

        img.onload = () => {
            // Configura el tamaño del canvas
            canvas.width = 210 * 2.834; // A4 width in pixels
            canvas.height = 297 * 2.834; // A4 height in pixels

            // Título centrado
            ctx.font = 'bold 18px Helvetica';
            ctx.textAlign = 'center';
            ctx.fillText('Historia Clínica del Paciente', canvas.width / 2, 30);

            // URL a la derecha
            ctx.font = '10px Helvetica';
            ctx.textAlign = 'right';
            ctx.fillText('www.segimed.com', canvas.width - 20, 30);

            // Línea horizontal debajo del título y la URL
            ctx.beginPath();
            ctx.moveTo(20, 40);
            ctx.lineTo(canvas.width - 20, 40);
            ctx.stroke();

            // Insertar avatar del usuario a la izquierda
            ctx.drawImage(img, 20, 50, 40, 40);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(20, 50, 40, 40);

            // Datos del Paciente a la derecha del avatar
            ctx.font = 'bold 12px Helvetica';
            ctx.textAlign = 'left';
            ctx.fillText(`Nombre: `, 70, 60)
            ctx.fillText(`Fecha de Nacimiento: `, 70, 70);
            ctx.fillText(`Grupo HTP: `, 70, 80);
            ctx.font = '12px Helvetica';
            ctx.textAlign = 'left';
            ctx.fillText(`${user.name} ${user.lastname}`, 130,60)
            ctx.fillText(`${user.sociodemographicDetails.birthDate} (${CalcularEdad(user.sociodemographicDetails.birthDate)})`, 200, 70)
            ctx.fillText(`${user.patientPulmonaryHypertensionGroups.group}`,140, 80)
      

            // Línea horizontal debajo de los datos del paciente
            ctx.beginPath();
            ctx.moveTo(20, 100);
            ctx.lineTo(canvas.width - 20, 100);
            ctx.stroke();

            // Sección de Antecedentes
            ctx.font = 'bold 14px Helvetica';
            ctx.textAlign = 'center';
            ctx.fillText('Antecedentes:', canvas.width / 2, 120);
        };
    }, [user]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
};

