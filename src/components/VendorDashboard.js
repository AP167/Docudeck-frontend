import React from 'react'
import { useState, useEffect } from 'react';
import TenderList from './TenderList'


const VendorDashboard = () => {
  const [tenders, setTenders] = useState([{name: 'tender 1', description: '1 ghjgj'}, {name: 'tender 2', description: '2 klfjfj'}]);

    useEffect(() => {
        // Simulate fetching tenders from the database
        // Replace this with your actual API call
        const fetchData = async () => {
          try {
            const apiUrl = `https://docudeck.pythonanywhere.com/fetch-tenders`;
    
            const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setTenders(data);
              console.log('recieved list')
            } else {
              console.error('Error fetching tenders:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching tenders:', error);
          }
        };

        fetchData();
    }, []); // Run only once on component mount

  return (
    <>
      <div className="dashboard-body body-container">
        <div className="card tenders-published">
          <h2>Tenders Published</h2>
        </div>
        <div className="card">
          <div className="tdb-card">
              <TenderList tenders={tenders} type={"vendor"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorDashboard