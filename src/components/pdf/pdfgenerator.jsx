import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CalcularEdad from '@/utils/calcularEdad';
import logosegimed from "../../../public/images/logosegimed.png";

export default async function GeneratePDF(user, infoPatient) {
    const doc = new jsPDF();

    const avatarUrl = user.avatar;
    const avatarImage = await fetch(avatarUrl)
        .then(res => res.blob())
        .then(blob => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        }));
    // Incluir logo PNG a la izquierda
    // doc.addImage(logosegimed, 'PNG', 20, 10, 40, 40);

    // Título centrado
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Historia Clínica del Paciente', 105, 30, { align: 'center' });

    // URL a la derecha
    const url = 'www.segimed.com';
    doc.setFontSize(10);
    doc.text(url, 190, 30, { align: 'right' });

    // Línea horizontal debajo del título y la URL
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    // Espacio
    doc.text('', 20, 50);

    // Insertar avatar del usuario a la izquierda
    if (avatarImage) {
        doc.addImage(avatarImage, 'JPEG', 20, 50, 40, 40, null, 'FAST');
        doc.setDrawColor(0, 0, 0);
        // doc.setLineWidth(0.5);
        // doc.roundedRect(20, 50, 40, 40, 50, 50, 'D'); // Redondear el borde del avatar
    }

    // Datos del Paciente a la derecha del avatar
    doc.setFontSize(12);

    // Establecer fuente en negrita para el título
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre:', 70, 60);
    doc.text('Fecha de Nacimiento:', 70, 70);
    doc.text('Grupo HTP:', 70, 80);

    // Cambiar a fuente normal para los datos
    doc.setFont('helvetica', 'normal');
    doc.text(`${user.name} ${user.lastname}`, 120, 60);
    doc.text(`${user.sociodemographicDetails.birthDate} (${CalcularEdad(user.sociodemographicDetails.birthDate)} años)`, 120, 70);
    doc.text(`${user.patientPulmonaryHypertensionGroups.group}`, 120, 80);

    // Espacio
    doc.text('', 20, 90);

    // Línea horizontal debajo de los datos del paciente
    doc.line(20, 100, 190, 100);

    // Espacio
    doc.text('', 20, 110);

    // Sección de Antecedentes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const antecedentesTitle = 'Antecedentes:';
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(antecedentesTitle);
    const x = (pageWidth - textWidth) / 2;

    // Título centrado
    doc.text(antecedentesTitle, x, 120);

    // Sección de antecedentes
    const antecedentes = [
        { title: 'Riesgo cardiovascular:', data: user.patientPulmonaryHypertensionRisks.risk || '-' },
        { title: 'Riesgo quirúrgico:', data: user.patientSurgicalRisks.risk || '-' },
        { title: 'Antecedentes quirúrgicos:', data: user.backgrounds.surgicalBackground || '-' },
        { title: 'Antecedentes patológicos:', data: user.backgrounds.pathologicBackground || '-' },
        { title: 'Antecedentes no patológicos:', data: user.backgrounds.nonPathologicBackground || '-' },
        { title: 'Antecedentes familiares:', data: user.backgrounds.familyBackground || '-' },
        { title: 'Antecedentes de infancia:', data: user.backgrounds.pediatricBackground || '-' },
        { title: 'Medicación actual:', data: user.backgrounds.pharmacologicalBackground || '-' },
        { title: 'Alergias:', data: user.backgrounds.allergicBackground || '-' },
        { title: 'Vacunas:', data: user.backgrounds.vaccinationBackground || '-' }
    ];
    
    let y = 130; // Empezar la sección de antecedentes debajo del título "Antecedentes:"
    doc.setFontSize(12);
    
    antecedentes.forEach(section => {
        // Título en negrita
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, 20, y);
        y += 10;
    
        // Datos en fuente normal
        doc.setFont('helvetica', 'normal');
        doc.text(section.data, 20, y, { maxWidth: 170 }); // Ajusta maxWidth si es necesario
        y += 20; // Espacio entre párrafos
    });
    

    // Generar el PDF
    doc.save('Historia_Clinica.pdf');
}



