import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing the checkmark icon from react-icons
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/UploadDocuments.css'

const UploadDocument =() => {
  const location = useLocation();
  const { tender } = location.state || {};

  const [requiredDocs, setRequiredDocs] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [comments, setComments] = useState('sample comments');

  console.log(tender.name);

  // Fetch the list of required documents from the database
  useEffect(() => {
    // Replace with actual API call to fetch required documents
    const fetchRequiredDocs = async () => {
      // Example response from API
      const response = ['Doc 1', 'Doc 2', 'Doc 3'];
      setRequiredDocs(response);
    };
    fetchRequiredDocs();
  }, []);

  let navigate = useNavigate();

  const handleFileChange = (docName, file) => {
    setUploadedFiles({ ...uploadedFiles, [docName]: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmissionSuccess(true);  // remove this later


    // Implement the logic to submit the files to the server
    // For example, using FormData to append each file and send it via POST request
    const formData = new FormData();
    Object.keys(uploadedFiles).forEach((docName) => {
      formData.append(docName, uploadedFiles[docName]);
    });

    // Replace with actual API call to submit documents
    const response = await fetch('/submit-documents', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      setComments(result.comments); // Assuming the API returns comments in the response
      setSubmissionSuccess(true);
    }
  };

  if (submissionSuccess) {
    return (
      <div>
        <FaCheckCircle size="3em" color="green" />
        <p>Successfully submitted documents</p>
        <textarea value={comments} readOnly />
        <button onClick={() => navigate('/vendor-dashboard')}>Go back to dashboard</button>
      </div>
    );
  }

  return (
      <form onSubmit={handleSubmit}>
        <div className="dashboard-body tender-show ">
          <span className="tname">
             <h1>Tender Name</h1>
          </span>
        </div>
        <div className="dashboard-body tender-show">
          <div className="card tdb-card">
              {requiredDocs.map((docName) => (
                <div className='tender-card ' key={docName}>
                  <label className='names'>{docName} </label>
                  <input
                    className='file-input'
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(docName, e.target.files[0])}
                  />
                </div>
              ))}
            <button className='primary-btn submit-btn' type="submit" disabled={requiredDocs.length !== Object.keys(uploadedFiles).length}>
              Submit
            </button>
          </div>
        </div>
      </form>
  );
}

export default UploadDocument;