import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CalcularEdad from '@/utils/calcularEdad';
import avatar from '@/utils/defaultAvatar';

// Función para redondear la imagen en un canvas
async function getCircularImageDataURL(imageUrl, size) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Para manejar imágenes de otros dominios
    img.src = imageUrl || avatar;

    return new Promise((resolve) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, size, size);

            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, size, size);

            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };
    });
}



export default async function GeneratePDF(user, consultas) {
    const doc = new jsPDF();
    let y = 30; // Posición inicial

    function addPageIfNeeded(extraSpace = 20) {
        const pageHeight = doc.internal.pageSize.height;
        const bottomMargin = 10; // Margen inferior
        if (y + extraSpace > pageHeight - bottomMargin) {
            doc.addPage();
            y = 20; // Reiniciar la posición vertical después de agregar una página
        }
    }

    const avatarUrl = user.avatar;
    const imageSize = 400; // Ajustar según sea necesario
    const circularAvatarDataURL = await getCircularImageDataURL(avatarUrl, imageSize);
    function splitTextIntoParagraphs(text, maxChars = 620) {
        const paragraphs = [];
        let startIndex = 0;
    
        while (startIndex < text.length) {
            const endIndex = Math.min(startIndex + maxChars, text.length);
            paragraphs.push(text.substring(startIndex, endIndex));
            startIndex = endIndex;
        }
    
        return paragraphs;
    }
    

  

    // Título centrado
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Historia Clínica del Paciente', 105, y, { align: 'center' });

    // URL a la derecha
    const url = 'www.segimed.com';
    doc.setFontSize(10);
    doc.text(url, 190, y, { align: 'right' });

    // Línea horizontal debajo del título y la URL
    doc.setLineWidth(0.5);
    doc.line(20, y + 10, doc.internal.pageSize.width - 20, y + 10);

    y += 20;

    // Insertar avatar del usuario a la izquierda
    if (circularAvatarDataURL) {
        const x = 20;
        const height = 40;
        const width = 40;

        addPageIfNeeded();
        doc.addImage(circularAvatarDataURL, 'JPEG', x, y, width, height, null, 'FAST');
    }

    // Datos del Paciente a la derecha del avatar
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre:', 70, y + 10);
    doc.text('Fecha de Nacimiento:', 70, y + 20);
    doc.text('Grupo HTP:', 70, y + 30);

    // Cambiar a fuente normal para los datos
    doc.setFont('helvetica', 'normal');
    doc.text(`${user.name} ${user.lastname}`, 120, y + 10);
    doc.text(`${user.sociodemographicDetails?.birthDate || "-"} (${CalcularEdad(user.sociodemographicDetails?.birthDate) || "-"} años)`, 120, y + 20);
    doc.text(`${user.patientPulmonaryHypertensionGroups?.group || "-"}`, 120, y + 30);

    y += 50;

    // Línea horizontal debajo de los datos del paciente
    doc.line(20, y, doc.internal.pageSize.width - 20, y);
    y += 10;

    // Sección de Antecedentes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const antecedentesTitle = 'Antecedentes:';
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(antecedentesTitle);
    const xTitle = (pageWidth - textWidth) / 2;

    addPageIfNeeded();
    doc.text(antecedentesTitle, xTitle, y);

    y += 10;
    const datos="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tincidunt ex sed dictum. Ut et nulla vehicula, scelerisque dolor ac, aliquet urna. Suspendisse potenti. Morbi ut metus et ipsum cursus fringilla eget quis ex. Maecenas id feugiat turpis. Suspendisse aliquam mauris ut mi vulputate ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tincidunt ex sed dictum. Ut et nulla vehicula, scelerisque dolor ac, aliquet urna. Suspendisse potenti. Morbi ut metus et ipsum cursus fringilla eget quis ex. Maecenas id feugiat turpis. Suspendisse aliquam mauris ut mi vulputate ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tincidunt ex sed dictum. Ut et nulla vehicula, scelerisque dolor ac, aliquet urna. Suspendisse potenti. Morbi ut metus et ipsum cursus fringilla eget quis ex. Maecenas id feugiat turpis. Suspendisse aliquam mauris ut mi vulputate ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tincidunt ex sed dictum. Ut et nulla vehicula, scelerisque dolor ac, aliquet urna. Suspendisse potenti. Morbi ut metus et ipsum cursus fringilla eget quis ex. Maecenas id feugiat turpis. Suspendisse aliquam mauris ut mi vulputate ultricies."

    const antecedentes = [
        { title: 'Riesgo cardiovascular:', data: user.patientPulmonaryHypertensionRisks?.risk || '-' },
        { title: 'Riesgo quirúrgico:', data: user.patientSurgicalRisks?.risk || '-' },
        { title: 'Antecedentes quirúrgicos:', data: user.backgrounds?.surgicalBackground || '-' },
        { title: 'Antecedentes patológicos:', data: user.backgrounds?.pathologicBackground || '-' },
        { title: 'Antecedentes no patológicos:', data: user.backgrounds?.nonPathologicBackground || '-' },
        { title: 'Antecedentes familiares:', data: user.backgrounds?.familyBackground || '-' },
        { title: 'Antecedentes de infancia:', data: user.backgrounds?.pediatricBackground || '-' },
        { title: 'Medicación actual:', data: user.backgrounds?.pharmacologicalBackground || '-' },
        { title: 'Alergias:', data: datos || '-' },
        { title: 'Vacunas:', data: user.backgrounds?.vaccinationBackground || '-' }
    ];

    antecedentes.forEach(section => {
        addPageIfNeeded(30); // Asegurar espacio para el título y contenido
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(section.title, 20, y);
        y += 10;
        const paragraphs = splitTextIntoParagraphs(section.data, 310);
        paragraphs.forEach(paragraph => {
            addPageIfNeeded(30); // Verificar espacio para el texto
            doc.setFont('helvetica', 'normal');
            doc.text(paragraph, 20, y, { maxWidth: doc.internal.pageSize.width - 40 });
            y += 30; // Espacio entre párrafos
        });
    });

    // Línea horizontal después de Antecedentes
    doc.line(20, y, doc.internal.pageSize.width - 20, y);
    y += 10;

    if (Array.isArray(consultas) && consultas.length > 0) {
        consultas.forEach(consulta => {
            addPageIfNeeded(30); // Asegurar espacio para el título de la consulta
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            const consultaTitle = `Consulta ${consulta.fecha}`;
            const consultaTitleWidth = doc.getTextWidth(consultaTitle);
            const xConsultaTitle = (pageWidth - consultaTitleWidth) / 2;
            doc.text(consultaTitle, xConsultaTitle, y);
    
            y += 10;
    
            const anamnesis = [
                {title: 'Evolución de la enfermedad:', data: consulta.anamnesis?.evolucionEnfermedad || '-'},
                {title: 'Motivo de la consulta:', data: consulta.anamnesis?.motivoConsulta || '-'},
                {title: ' Síntomas importantes:', data: consulta.anamnesis?.sintomasImportantes || '-'},
            ];
            
            const evolucion = {title: '', data: consulta.evolucion || '-'};
    
            const diagYtratamiento = [
                {title: 'Diagnósticos:', data: consulta.diagnosticosYTratamiento.diagnosticos || '-'},
                {title: ' Medicamentos:', data: consulta.diagnosticosYTratamiento.medicamentos  || '-'},
                {title: ' Procedimientos:', data: consulta.diagnosticosYTratamiento.procedimientos || '-'},
                {title: ' Conducta Terapéutica:', data: consulta.diagnosticosYTratamiento.conductaTerapeutica || '-' },
                {title: ' Tratamiento No Farmacológico:', data: consulta.diagnosticosYTratamiento.tratamientoNoFarmacologico || '-'},
                {title: ' Pauta de Alarma:', data: consulta.diagnosticosYTratamiento.pautaAlarma || '-'},
            ];
    
            const signosVitales = [
                { title:"",data: `
                Estatura: ${consulta.signosVitales.estatura || '-'}
                Peso: ${consulta.signosVitales.peso || '-'}
                IMC: ${consulta.signosVitales.imc || '-'}
                Temperatura: ${consulta.signosVitales.temperatura || '-'}
                `},{title:"",data:`
                Frecuencia Cardíaca: ${consulta.signosVitales.frecuenciaCardiaca || '-'}
                PA Sistólica: ${consulta.signosVitales.paSistolica || '-'}
                PA Diastólica: ${consulta.signosVitales.paDiastolica || '-'}
                Frecuencia Respiratoria: ${consulta.signosVitales.frecuenciaRespiratoria || '-'}
                `},{title:"",data:
                `
                Saturación de Oxígeno: ${consulta.signosVitales.saturacionOxigeno || '-'}
                Clase Funcional: ${consulta.signosVitales.claseFuncional || '-'}
                Glucemia: ${consulta.signosVitales.glucemia || '-'}
            ` },
            ];
            
            const allSections = [
                { title: 'Anamnesis:', data: anamnesis },
                { title: 'Signos Vitales:', data: signosVitales },
                { title: 'Evolución:', data: [evolucion] },
                { title: 'Diagnóstico y Tratamiento:', data: diagYtratamiento },
                
            ];
    
            allSections.forEach(section => {
                addPageIfNeeded(30);
    
                // Título de la sección alineado a la izquierda
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(16);
                doc.text(section.title, 12, y);
                y += 10;
    
                section.data.forEach(subSection => {
                    addPageIfNeeded(30);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(12);
                    doc.text(subSection.title, 12, y);
                    y += 10;
    
                    const isSignosVitales = section.title === 'Signos Vitales';
                    const maxChars = 310;
                    const spacing = isSignosVitales ? 50 : 30; 
    
                    const paragraphs = splitTextIntoParagraphs(subSection.data, maxChars);
                    paragraphs.forEach(paragraph => {
                        addPageIfNeeded(30);
                        doc.setFont('helvetica', 'normal');
                        doc.text(paragraph, 20, y, { maxWidth: doc.internal.pageSize.width - 40 });
                        y += spacing;
                    });
                });
            });
            doc.line(20, y, doc.internal.pageSize.width - 20, y);
            y += 10;
        });
    }
    
    
    doc.save(`${user.name}_historia_clinica.pdf`);
}

