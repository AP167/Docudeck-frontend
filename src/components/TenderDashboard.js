import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TenderList from './TenderList';
import './styles/TenderDashboard.css'


const TenderDashboard = () => {
    const [tenders, setTenders] = useState([{name: 'tender 1', description: '1 ghjgj'}, {name: 'tender 2', description: '2 klfjfj'}]);

    let navigate = useNavigate();
    
    useEffect(() => {
        // Simulate fetching tenders from the database
        // Replace this with your actual API call
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:5000/fetch-tenders`;
        
                const response = await fetch(apiUrl, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
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
        <div className='dashboard-body body-container'>
            <div className="card tdb-card">
                <button onClick={() => navigate('/upload-tender')} className="create-tender-button">
                    Create Tender
                </button>
            </div>
            <div className="card tdb-card">
                <h2>Tenders published</h2>
                <TenderList className='t-card' tenders={tenders} type={"tender"} />
            </div>
        </div>
    );
}

export default TenderDashboard