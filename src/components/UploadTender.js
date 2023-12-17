import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import UploadPdf from './UploadPdf';
import PdfViewer from './PdfViewer';
import './styles/UploadTender.css';
import Select from 'react-select';
import FloatingNavbar from './FloatingNavbar';

const UploadTender = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'aadhar', label: 'Aadhar card' },
    { value: 'pan', label: 'Pan card' },
    { value: 'voter', label: 'Voter card' },
  ];

  const onUpload = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    setPdfFile(fileUrl);

    setIsLoading(true);

    const formData = new FormData();
    formData.append('tenderId',1);
    formData.append('taId',1);
    formData.append('tenderName','abc');
    formData.append('date',"2023-12-16");
    formData.append('tender', file);

    const response = await fetch('https://docudeck.pythonanywhere.com/add-tender', {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Control-Allow-Origin': '*', 
      },
    });

    if (response.ok) {
      console.log("tender submitted")
    } else {
      console.error('Failed to submit PDF');
    }

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
    }, 10000);

  };

  const handlePublish = () => {
    // Implement the logic to publish the document
  };

  const handleUploadAnotherDoc = () => {
    setPdfFile(null);
    setServerResponse(null);
  };

  const isButtonDisabled = selectedOptions.length === 0;

  return (
    <div className='upload-tender-body' style={{ display: 'flex', width: '100%' }}>
      <FloatingNavbar />
      <div className='upload-tender-block upload-doc-block' style={{ width: '50%' }}>
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
      <div className='upload-tender-block comply-block' style={{ width: '50%' }}>
        <div className="tcomp-res-container">
        {isLoading ? (
            <FaSpinner size="2em" className="spinner" />
        ) : serverResponse ? (
          serverResponse.complying ? (
            <div className='tcomp-res a'>
              <p>{serverResponse.message}</p>
              <p>
                 <FaCheckCircle size="3em" color="green"/>
              </p>
              <div className="req-doc-form">
                <Select
                    className='multiselect'
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={setSelectedOptions}
                    placeholder="Required Documents for this Tender"
                    required
                  />
                </div>
              <button className={isButtonDisabled ? 'disabled tcres-btn' : 'primary-btn tcres-btn'} onClick={handlePublish} disabled={isButtonDisabled}>Publish</button>
              
            </div>
          ) : (
            <div className='tcomp-res card'>
              <p>Violating rules:</p>
              <ul>
                {serverResponse.violatingRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              <button className='primary-btn tcres-btn' onClick={handleUploadAnotherDoc}>Upload another doc</button>
            </div>
          )
        ) : null}</div>
      </div>
    </div>
  );
}

export default UploadTender;