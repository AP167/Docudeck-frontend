import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles/UploadRule.css';

const UploadRule = ({ onUpload }) => {
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    if (!uploadedFile || uploadedFile.type !== 'application/pdf') {
      setErrorMessage('*Only PDF files are allowed');
      setUploadedPDF(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdfFile', uploadedFile);
      console.log(formData)
      const response = await fetch('http://127.0.0.1:5000/add-policy', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setErrorMessage('');
        setUploadedPDF(uploadedFile);
        onUpload(acceptedFiles);
      } else {
        console.error('File upload failed');
        setErrorMessage('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file', error);
      setErrorMessage('Error uploading file');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
  });

  return (
    <div className='upload'>
      <div {...getRootProps()} className="dropzone">
        <div>
          <h1 className="heading">Upload new Rules & Regulations</h1>
          <p className='subheading'>(can be memo, circular, notice, etc...)</p>
        </div>

        <br /> <br /> <br />

        <button className="mainBtn">Click to select a PDF file</button>
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

export default UploadRule;

