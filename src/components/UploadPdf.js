import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles/UploadPdf.css';
import FloatingNavbar from './FloatingNavbar';

const UploadPdf = ({ onUpload, uploadHeader, uploadDescription }) => {
    const [uploadedPDF, setUploadedPDF] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    if (!uploadedFile || uploadedFile.type !== 'application/pdf') {
      setErrorMessage('*Only PDF files are allowed');
      setUploadedPDF(null);
      return;
    }

    setUploadedPDF(uploadedFile);
    setErrorMessage('');
    onUpload(uploadedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
  });

  return (
    <div className='upload'>
      <FloatingNavbar />
      <div {...getRootProps()} className="dropzone">
        <div>
        <h1 className="heading">{uploadHeader}</h1>
        <p className='subheading'>{uploadDescription}</p>
        </div>

        <br /> <br /> <br />

        <btn className="mainBtn">Click to select a PDF file</btn>
        <p className='dropMsg'>or drop PDF here</p>
  
        <input {...getInputProps()} />
        {errorMessage && <p className="error-message"> {errorMessage} </p>}
        {uploadedPDF && (
          <div className="uploaded-pdf">
            <h2>PDF Uploaded.</h2>
            <p>{uploadedPDF.name}</p>
            <a href={URL.createObjectURL(uploadedPDF)} target="_blank" rel="noopener noreferrer">
                View Uploaded PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPdf;

