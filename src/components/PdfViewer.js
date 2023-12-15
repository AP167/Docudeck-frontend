import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import pdf from './b.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const PdfViewer = ({ pdfFile }) => {
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }){
        setNumPages(numPages);
    }

    return (
        <div>
            {console.log(pdfFile)}
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        {
            Array.from({ length: numPages }, (_, index) => (
                <div key={index}>
                <Page 
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
                <p>
                    Page {index + 1} of {numPages}
                </p>
                </div>
            ))
        }
      </Document>
        
        </div>
    );
}

export default PdfViewer