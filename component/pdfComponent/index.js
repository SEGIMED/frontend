import React, { useImperativeHandle, forwardRef } from 'react';
import html2pdf from 'html2pdf.js';

const PDFGenerator = forwardRef(({ elementId, onPdfGenerated }, ref) => {
    // Define la función que será expuesta a través del ref
    const generatePDF = async () => {
        const element = document.getElementById(elementId);

        const opt = {
            margin: 0,
            filename: 'reporte.pdf',
            image: { type: 'png', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '.page-break' }
        };

        const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');

        const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(pdfBlob);
        });

        if (onPdfGenerated) {
            onPdfGenerated(base64String);
        }

        return base64String;
    };

    // Expón la función `generatePDF` a través del ref
    useImperativeHandle(ref, () => ({
        generatePDF
    }));

    return null; // No necesita renderizar nada
});

export default PDFGenerator;
