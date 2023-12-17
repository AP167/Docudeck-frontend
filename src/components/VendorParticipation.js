import React from 'react';
import { FaDownload } from 'react-icons/fa'; 
import './styles/VendorParticipation.css';
import { useLocation } from 'react-router-dom';
import FloatingNavbar from './FloatingNavbar';

const VendorParticipation = () => {
    const location = useLocation();
    const { tender } = location.state || {};
    console.log(tender.name)
    const vendors = [
    { 
      tender_no: '1',
      name: 'Vendor A',  
      docs: [
        { name: 'Doc A1', link: '/a.pdf' },
        { name: 'Doc A2', link: '/b.pdf' },
      ],
      comment: 'A'
    },
    { 
      tender_no: '1',
      name: 'Vendor B', 
      docs: [
        { name: 'Doc B1', link: '/a.pdf' },
        { name: 'Doc B2', link: '/b.pdf' },
      ],
      comment: 'B'
    },
    { 
      tender_no: '1',
      name: 'Vendor C', 
      docs: [
        { name: 'Doc C1', link: '/a.pdf' },
        { name: 'Doc C2', link: '/b.pdf' },
      ],
      comment: 'C'
    },
  ];

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'downloaded-file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Group vendors by tender_no using an object
  const groupedVendors = vendors.reduce((acc, vendor) => {
    const { tender_no, name, docs, comment } = vendor;
    if (!acc[tender_no]) {
      acc[tender_no] = [];
    }
    const existingVendor = acc[tender_no].find(v => v.name === name);

    if (existingVendor) {
      existingVendor.docs = existingVendor.docs.concat(docs);
    } else {
      acc[tender_no].push({ name, docs, comment });
    }

    return acc;
  }, {});

  return (
    <div className="dashboard-body body-container">
      <FloatingNavbar />
      <div className='card tdb-card'>
          {Object.entries(groupedVendors).map(([tender_no, vendorsForTender]) => (
            <div className='tender-list vendorContainer' key={tender_no}>
              <h2>Tender No: {tender_no}</h2>
              {vendorsForTender.map((vendor, index) => (
                <div className='tender-card' key={index}>
                  <span className='details comments names'>
                    {vendor.name}
                  </span>
                  <span className='details comments docs'>
                      <span className="headingDocs">Docs: </span>    
                    {vendor.docs.map((doc, docIndex) => (
                      <span key={docIndex}>
                        <a href={doc.link} target="_blank" rel="noopener noreferrer">
                          {doc.name}
                        </a>
                        <FaDownload onClick={() => handleDownload(doc.link, doc.name)} className="download-icon" />
                        {docIndex < vendor.docs.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                  <span className='details comments'>
                    Comments: {vendor.comment}
                  </span>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default VendorParticipation;
