import React from 'react';
import './styles/VendorParticipation.css';

const VendorParticipation = () => {
  const vendors = [
    { 
      tender_no:'1',
      name: 'Vendor A',  
      docs: [
        { name: 'Doc A1', link: '/a.pdf' },
        { name: 'Doc A2', link: '/b.pdf' },
      ],
      comment: 'A'
    },
    { 
      tender_no:'2',
      name: 'Vendor B', 
      docs: [
        { name: 'Doc B1', link: '/a.pdf' },
        { name: 'Doc B2', link: '/b.pdf' },
      ],
      comment: 'B'
    },
    { 
      tender_no:'2',
      name: 'Vendor B', 
      docs: [
        { name: 'Doc B1', link: '/a.pdf' },
        { name: 'Doc B2', link: '/b.pdf' },
      ],
      comment: 'B'
    },
    { 
      tender_no:'2',
      name: 'Vendor B', 
      docs: [
        { name: 'Doc B1', link: '/a.pdf' },
        { name: 'Doc B2', link: '/b.pdf' },
      ],
      comment: 'B'
    },
    { 
      tender_no:'2',
      name: 'Vendor B', 
      docs: [
        { name: 'Doc B1', link: '/a.pdf' },
        { name: 'Doc B2', link: '/b.pdf' },
      ],
      comment: 'B'
    }
  ];

  return (
    <>
      <div className="outer">
        <div className='container'>
          {vendors.map((vendor, index) => (
            <div className='vendor' key={index}>
              <span className='details'>
                Tender No: {vendor.tender_no}
              </span>
              <span className='details'>
                Name: {vendor.name}
              </span>
              <span className='details'>
                Docs: 
                {vendor.docs.map((doc, docIndex) => (
                  <span key={docIndex}>
                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                    {docIndex < vendor.docs.length - 1 && ', '}
                  </span>
                ))}
              </span>
              <span className='details'>
                Comment: {vendor.comment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VendorParticipation;
