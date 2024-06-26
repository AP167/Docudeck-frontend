import React from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PdfViewer from './PdfViewer';
import './styles/DisplayRules.css'
import Chatbot from './Chatbot';
import { useAuth } from '../AuthContext';

const DisplayRules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [department, setDepartment] = useState('');
  const [ministry, setMinistry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const {currentUser, currentUserRole} = useAuth();
  console.log(currentUser, currentUserRole);

  // const documents = [
  //   { documentNumber: '123', issueDate: '2023-01-01', title: 'Tender Rules and Regulations', content: 'Document content about tender rules and regulations', url: '/a.pdf' },
  //   { documentNumber: '456', issueDate: '2023-02-15', title: 'Procurement Guidelines', content: 'Document content about procurement guidelines', url: '/b.pdf' },
  //   { documentNumber: '789', issueDate: '2023-03-20', title: 'Contract Terms and Conditions', content: 'Document content about contract terms and conditions hkajdhka', url: '/111.pdf' },
  // ];

  const deptList = ['Department of Finance', 'Department of Coal', 'Department of Power'];
  const ministryList = ['Ministry of Finance', 'Ministry of Coal', 'Ministry of Power'];

  const handleSearch = async () => {
    const searchParams = {
      keywords: [searchTerm],
      policy_id: documentNumber,
      issue_date: issueDate,
      date_from: fromDate,
      date_to: toDate,
      department: department,
      ministry: ministry
    };

    try {
      const response = await fetch('http://localhost:5000/search-policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        },
        body: JSON.stringify(searchParams),
      });

      if (response.ok) {
        const policies = await response.json();
        console.log('Policies fetched:', policies);
        setSearchResults(policies);
        setSelectedDocument(null);
      } else {
        console.error('Failed to fetch policies');
      }
    } catch (error) {
      console.error('Error searching for policies:', error);
    }

    // const filteredResults = documents.filter(document =>
    //   document.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //   document.documentNumber.includes(documentNumber) && (!issueDate || document.issueDate === issueDate) &&
    //   (!fromDate || !toDate || (document.issueDate >= fromDate && document.issueDate <= toDate))
    // );

    // setSearchResults(filteredResults);
    // setSelectedDocument(null);
  };

  const handleReset = () => {
    setSearchTerm('');
    setDocumentNumber('');
    setIssueDate('');
    setFromDate('');
    setToDate('');
    setSearchResults([]);
    setSelectedDocument(null);
  };

  const handleDocumentClick = (documentIndex) => {
    setSelectedDocument(documentIndex);
    setDownloadUrl(searchResults[documentIndex]);
  };

  const handleBackToResults = () => {
    setSelectedDocument(null);
  };

  return (
    <div className='body-container'>
    <Chatbot />
    <div className='search-container card'>
      <div className="searchbar-container">
        <div className='searchbar-wrapper'>
          <FaSearch id="search-icon" />
          <input
            className='search-input'
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className='search-btn primary-btn' onClick={handleSearch}>Search</button>
      </div>
      <div className='search-filter-container'>
        <div className="docno-container filter-container">
          <label>
            <span className='a'>Circular/Memo/Notice number : </span>
            <input
              type="text"
              placeholder=""
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
          </label>
          
        </div>
        <div className="date-container filter-container">
          <label>
            <span>Issue date : </span>
            <input
              type="date"
              placeholder="Issue Date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </label>
        </div>
        <div className='date-range-container filter-container'>
          <label>
            <span>From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            <span className='to-date'>To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
        {/* <div className="date-picker-container filter-container">
              <label htmlFor="datepicker" className="datepicker-label">
                <FaRegCalendarAlt className="calendar-icon" />
                <input
                  type="date"
                  id="datepicker"
                  className="date-input"
                  placeholder="DD/MM/YYYY"
                />
              </label>
            </div> */}
        <div className="department-container filter-container">
          <label>
            Department : 
            <select value={department} onChange={(e) => setDepartment(e.target.value)}className='inp'>
              <option value="">Select a department</option>
              {deptList.map((dept) => (
                  <option key={dept} value={dept}>
                  {dept}
                  </option>
              ))}
            </select>
          </label>
        </div>
        <div className="ministry-container filter-container">
          <label>
            Ministry : 
            <select value={ministry} onChange={(e) => setMinistry(e.target.value)} className='inp'>
              <option value="">Select a Ministry</option>
              {ministryList.map((dept) => (
                  <option key={dept} value={dept}>
                  {dept}
                  </option>
              ))}
            </select>
          </label>
        </div>
        <button className='filter-btn tertiary-btn' onClick={handleSearch}>Apply Filter</button>
        <button className='reset-btn tertiary-btn' onClick={handleReset}>Reset</button>
      </div>
    </div>

    <div className='results-container card'>
      {selectedDocument === null ? (
          <div>
            <div className='search-res-msg' style={{ display: searchResults.length === 0 ? 'block' : 'none' }}>
              {searchResults.length === 0 ? "No Search Results" : "Search Results"}
            </div>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <h3 onClick={() => handleDocumentClick(index)}>
                    <a href="#!">{result.substring(result.lastIndexOf('\\') + 1)}</a>
                  </h3>
                  {/* <p>Matched Keywords: {result.matchedKeywords.join(', ')}</p> */}
                  {/* <p>{result.content.substring(0, 150)}{result.content.length > 150 ? "..." : ""}</p> */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <a href="#!" onClick={handleBackToResults} className='tertiary-btn back-to-reults'>Back to Results</a>
            <br /> <br />
            <h2 className='doc-title'>{searchResults[selectedDocument].substring(searchResults[selectedDocument].lastIndexOf('\\'))}</h2>
            <br /> <br />
            <a className='secondary-btn download' href={downloadUrl} download={`document_${selectedDocument + 1}.pdf`}> Download </a>
            {/* <a href={URL.createObjectURL(documents[selectedDocument].url)} target="_blank" >
              View Uploaded PDF
            </a> */}
            <div style={{display: "flex", justifyContent: "center"}}>
              <div className='card pdf-card'>
                {console.log(searchResults[selectedDocument])}
                  <PdfViewer pdfFile={searchResults[selectedDocument].substring(searchResults[selectedDocument].lastIndexOf('\\'))} />
              </div>
            </div>
          </div>
        )}
    </div>
    </div>
  );
}

export default DisplayRules

