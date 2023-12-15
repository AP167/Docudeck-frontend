import React from 'react'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import PdfViewer from './PdfViewer';
import './styles/DisplayRules.css'
import { FaRegCalendarAlt } from 'react-icons/fa';

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

  const documents = [
    { documentNumber: '123', issueDate: '2023-01-01', title: 'Tender Rules and Regulations', content: 'Document content about tender rules and regulations', url: '/a.pdf' },
    { documentNumber: '456', issueDate: '2023-02-15', title: 'Procurement Guidelines', content: 'Document content about procurement guidelines', url: '/b.pdf' },
    { documentNumber: '789', issueDate: '2023-03-20', title: 'Contract Terms and Conditions', content: 'Document content about contract terms and conditions hkajdhka', url: '/c.pdf' },
  ];

  const deptList = ['Department of Finance', 'Department of Coal', 'Department of Power'];
  const ministryList = ['Ministry of Finance', 'Ministry of Coal', 'Ministry of Power'];

  const pdfFile = "http://africau.edu/images/default/sample.pdf"
  


  const handleSearch = async () => {
    const searchParams = {
      policy_id: "2",
      issue_date: "2023-10-10",
      date_from: "2001-10-10",
      date_to: "2002-10-10",
      department: "1",
      ministry: "1"
    };

    try {
      const response = await fetch('http://localhost:5000/search-policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (response.ok) {
        const policies = await response.json();
        console.log('Policies fetched:', policies);
      } else {
        console.error('Failed to fetch policies');
      }
    } catch (error) {
      console.error('Error searching for policies:', error);
    }

    const filteredResults = documents.filter(document =>
      document.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      document.documentNumber.includes(documentNumber) && (!issueDate || document.issueDate === issueDate) &&
      (!fromDate || !toDate || (document.issueDate >= fromDate && document.issueDate <= toDate))
    );

    setSearchResults(filteredResults);
    setSelectedDocument(null);
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
  };

  const handleBackToResults = () => {
    setSelectedDocument(null);
  };

  return (
    <>
    <div className='search-container'>
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
        <button className='search-btn' onClick={handleSearch}>Search</button>
      </div>
      <div className='search-filter-container'>
        <div className="docno-container filter-container">
          <label>
            <span>Circular/Memo/Notice number : </span>
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
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
            <select value={ministry} onChange={(e) => setMinistry(e.target.value)}>
              <option value="">Select a Ministry</option>
              {ministryList.map((dept) => (
                  <option key={dept} value={dept}>
                  {dept}
                  </option>
              ))}
            </select>
          </label>
        </div>
        <button className='filter-btn' onClick={handleReset}>Apply Filter</button>
        <button className='reset-btn' onClick={handleReset}>Reset</button>
      </div>
    </div>

    <div className='results-container'>
      {selectedDocument === null ? (
          <div>
            <div className='search-res-msg'>
              {searchResults.length === 0 ? "No Search Results" : "Search Results"}
            </div>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <h3 onClick={() => handleDocumentClick(index)}>
                    <a href="#!">{result.title}</a>
                  </h3>
                  {/* <p>Matched Keywords: {result.matchedKeywords.join(', ')}</p> */}
                  <p>{result.content.substring(0, 150)}{result.content.length > 150 ? "..." : ""}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <a href="#!" onClick={handleBackToResults}>Back to Results</a>
            <button >download</button>
            <h2>{documents[selectedDocument].title}</h2>
            {/* <a href={URL.createObjectURL(documents[selectedDocument].url)} target="_blank" >
              View Uploaded PDF
            </a> */}
            <div style={{display: "flex", justifyContent: "center"}}>
              <div style={{width: "700px", border: "3px solid gray"}}>
                {console.log(documents[selectedDocument].url)}
                  <PdfViewer pdfFile={documents[selectedDocument].url} />
              </div>
            </div>
          </div>
        )}
    </div>
    </>
  );
}

export default DisplayRules

