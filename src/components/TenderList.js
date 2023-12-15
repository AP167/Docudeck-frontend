import React from 'react'

import { FaDownload, FaEye } from 'react-icons/fa';

const TenderCard = ({ tender, type }) => {
  const handleDownload = () => {
    // Handle download logic here
    console.log(`Downloading document for tender: ${tender.name}`);
  };

  const handleView = () => {
    // Handle view necessities logic here
    console.log(`Viewing necessities for tender: ${tender.name}`);

    if (type === "vendor"){
        // Participate

    } else {
        // View vendor participation
    }
  };

  return (
    <div className="tender-card">
      <h3>{tender.name}</h3>
      <p>{tender.description}</p>
      <div className="button-container">
        <button onClick={handleDownload}>
          <FaDownload /> Download
        </button>
        <button onClick={handleView}>
          <FaEye /> { type === "vendor" ? "Participate" : "View Vendor Participation"}
        </button>
      </div>
    </div>
  );
};


const TenderList = ({ tenders }) => {
  return (
    <div className="tender-list">
      {tenders.map((tender) => (
        <TenderCard key={tender.id} tender={"tender"} />
      ))}
    </div>
  );
};

export default TenderList