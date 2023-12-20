import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import './styles/TenderList.css'

const TenderCard = ({ tender, type }) => {

  let navigate = useNavigate();
  const handleDownload = () => {
    // Handle download logic here
    const blob = new Blob([tender], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = ` ${tender[2]}`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Downloading document for tender: ${tender[2]}`);
  };

  const handleView = () => {
    console.log(`Viewing necessities for tender: ${tender[2]}`);

    if (type === "vendor"){
        // Participate
        navigate('/vendor-upload-documents', {state: {tender}});
    } else {
        // View vendor participation
        navigate('/technical-evaluation', {state: {tender}});
    }
  };

  return (
    <div className="tender-card card">
      {console.log(tender[2])}
      <h3>{tender[2].substring(tender[2].lastIndexOf('\\') + 1)}</h3>
      <p>{tender[1]}</p>
      <div className="button-container">
          <button onClick={handleDownload}>
            <FaDownload /> Download
          </button>
        <button onClick={handleView}>
          { type === "vendor" ? "Participate" : <> Proceed to Technical Evaluation</>}
        </button>
      </div>
    </div>
  );
};


const TenderList = ({ tenders, type }) => {
  return (
    <div className="tender-list">
      {console.log(tenders)}
      {tenders.map((tender, index) => (
        <TenderCard key={index} tender={tender} type={type} />
      ))}
    </div>
  );
};

export default TenderList