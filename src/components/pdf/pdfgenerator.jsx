import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CalcularEdad from '@/utils/calcularEdad';
import avatar from '@/utils/defaultAvatar';
import logo from '@/utils/logoSegimed';
import { Fecha } from '@/utils/NormaliceFechayHora';
import { IMC } from '@/utils/normaliceVitalSigns';

async function getImageDataURL(imageUrl, size) {
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

            // Calculamos las dimensiones para mantener la proporción de la imagen original
            const scale = Math.min(size / img.width, size / img.height);
            const x = (size - img.width * scale) / 2;
            const y = (size - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };
    });
}

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

    //para los saltos de pagina
    function addPageIfNeeded(extraSpace = 20) {
        const pageHeight = doc.internal.pageSize.height;
        const bottomMargin = 10; // Margen inferior
        if (y + extraSpace > pageHeight - bottomMargin) {
            doc.addPage();
            y = 20; // Reiniciar la posición vertical después de agregar una página
        }
    }
    // si el texto de la data es muy largo lo divide en cuantos caracteres se necesite 
    function splitTextIntoParagraphs(text, maxChars) {
        text = String(text);
        // Ensure maxChars is a positive number
        if (typeof maxChars !== 'number' || maxChars <= 0) {
            throw new TypeError('The "maxChars" parameter should be a positive number');
        }
        
        const paragraphs = [];
        let startIndex = 0;
        
        while (startIndex < text.length) {
            const endIndex = Math.min(startIndex + maxChars, text.length);
            paragraphs.push(text.substring(startIndex, endIndex));
            startIndex = endIndex;
        }
        
        return paragraphs;
    }
    

    const avatarUrl = user.avatar;
    const imageSize = 400; // Ajustar según sea necesario
    const circularAvatarDataURL = await getCircularImageDataURL(avatarUrl, imageSize);

    const logoUrl = await getImageDataURL(logo, 400)
    //logo
    doc.addImage(logoUrl, 'JPEG', 10, 5, 40, 40)

    // Título centrado
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Historia Clínica del Paciente', 105, y, { align: 'center' });

    // URL a la derecha
    const urlColor = [72, 127, 250]; // [R, G, B] para el color #487FFA
    doc.setTextColor(...urlColor);
    const url = 'www.segimed.com';
    doc.setFontSize(10);
    doc.text(url, 190, 25, { align: 'right' });

    // Línea horizontal debajo del título y la URL
    doc.setLineWidth(0.5);
    doc.line(20, y + 10, doc.internal.pageSize.width - 20, y + 10);
    doc.setTextColor(0, 0, 0);
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
        { title: 'Alergias:', data: user.backgrounds?.allergicBackground  || '-' },
        { title: 'Vacunas:', data: user.backgrounds?.vaccinationBackground || '-' }
    ];

    antecedentes.forEach(section => {
        addPageIfNeeded(30); // Asegurar espacio para el título y contenido
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(section.title, 12, y);
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
            const consultaTitle = `Consulta ${Fecha(consulta.timestamp, 4) || "-"}`;
            const consultaTitleWidth = doc.getTextWidth(consultaTitle);
            const xConsultaTitle = (pageWidth - consultaTitleWidth) / 2;
            doc.text(consultaTitle, xConsultaTitle, y);
    
            y += 10;
    
            const anamnesis = [
                {title: 'Evolución de la enfermedad:', data: consulta?.chiefComplaint || '-'},
                {title: 'Motivo de la consulta:', data: consulta?.chiefComplaint || '-'},
                {title: ' Síntomas importantes:', data: consulta?.reviewOfSystems || '-'},
            ];

        
            
            const evolucion = [{title: '', data: consulta?.historyOfPresentIllness || '-'}];
               
            const formattedDrugs = consulta?.drugPrescriptions?.join(', ') || " - ";
            const formattedProcedures = consulta?.medicalProcedure?.join(', ') || " - ";
            const dignostic = consulta.diagnostics.length ? consulta.diagnostics?.map(d=>d.diagnosticNotes) : "-"
    
            const diagYtratamiento = [
                {title: 'Diagnósticos:', data: dignostic },
                {title: ' Medicamentos:', data: formattedDrugs  || '-'},
                {title: ' Procedimientos:', data: formattedProcedures || '-'},
                {title: ' Tratamiento No Farmacológico:', data: consulta.treatmentPlan || '-'},
                {title: ' Pauta de Alarma:', data: consulta.alarmPAttern || '-'},
            ];
           
            const antropometricTitle=[ "Estatura:", "Peso:", "IMC:"]

            const vitalSignsTitles = [
                "Temperatura:", "Frecuencia Cardíaca:",
                "PA Sistólica:", "PA Diastólica:", "Frecuencia Respiratoria:", "Saturación de Oxígeno:"
            ];
            const antropometriDetail=consulta?.antropetriDetails?.map((sign,index)=>({
                title: antropometricTitle[index] || "",
                data: `${sign?.measure || "-"} ${sign?.measureUnit}` 
            })) || [];

            const vitalSigns = consulta?.vitalSigns?.map((sign, index) => ({
                title: vitalSignsTitles[index] || "",
                data: `${sign?.measure || '-'} ${sign?.measureUnit}`
            })) || [];

            const signosVitales = [
                ...antropometriDetail,
                ...vitalSigns
            ];
            
            const allSections = [
                { title: 'Anamnesis:', data: anamnesis },
                { title: 'Signos Vitales:', data: signosVitales },
                { title: 'Evolución:', data: evolucion },
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
    
                    const isSignosVitales = section.title === 'Signos Vitales:';
                    const maxChars = 310;
                    const spacing = isSignosVitales ? 10 : 30; 
    
                    const paragraphs = splitTextIntoParagraphs(subSection.data, maxChars);
                    paragraphs.forEach(paragraph => {
                        addPageIfNeeded(30);
                        doc.setFont('helvetica', 'normal');
                        doc.text(paragraph, 20, y, { maxWidth: doc.internal.pageSize.width - 40 });
                        y += spacing;
                    });
                });
            });

            //linea horizontal despues de cada consulta 
            doc.line(20, y, doc.internal.pageSize.width - 20, y);
            y += 10;
        });
    }
    
    
    doc.save(`${user.name}_historia_clinica.pdf`);
}

