import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import UploadPdf from './UploadPdf';
import PdfViewer from './PdfViewer';

const UploadTender = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    setPdfFile(fileUrl);

    setIsLoading(true);

    // Here you would send the file to the database/server
    // For example, using FormData to append the file and send it via POST request
    // const formData = new FormData();
    // formData.append('tenderId',1);
    // formData.append('taId',1);
    // formData.append('tenderName','abc');
    // formData.append('date',"2023-12-16");
    // formData.append('tender', file);

    // const response = await fetch('http://localhost:5000/add-tender', {
    //   method: 'POST',
    //   body: formData,
    // });

    // if (response.ok) {
    //   console.log("tender submitted")
    // } else {
    //   console.error('Failed to submit PDF');
    // }

    setTimeout(() => {
        // Simulated server response
        const response = {
          complying: true,
          message: 'Complying with all rules',
          violatingRules: ['Rule 1', 'Rule 2', 'Rule 3'],
          comments: 'Some comments from the server.'
        };
        setServerResponse(response);
        setIsLoading(false);
    }, 2000);

  };

  const handlePublish = () => {
    // Implement the logic to publish the document
  };

  const handleUploadAnotherDoc = () => {
    setPdfFile(null);
    setServerResponse(null);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        {pdfFile ? (
          <PdfViewer pdfFile={pdfFile}/>
        ) : (
          <UploadPdf
            onUpload={onUpload}
            uploadHeader="Upload Tender Document"
            uploadDescription="( placeholder )"
          />
        )}
      </div>
      <div style={{ width: '50%', backgroundColor: 'coral' }}>
        {isLoading ? (
          <FaSpinner className="spinner" />
        ) : serverResponse ? (
          serverResponse.complying ? (
            <div>
              <p>{serverResponse.message}</p>
              <FaCheckCircle size="3em" color="green" />
              <button onClick={handlePublish}>Publish</button>
            </div>
          ) : (
            <div>
              <p>Violating rules:</p>
              <ul>
                {serverResponse.violatingRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              <button onClick={handleUploadAnotherDoc}>Upload another doc</button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default UploadTender;