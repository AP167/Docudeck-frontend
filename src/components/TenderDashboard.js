import React, { useState, useEffect } from 'react';
import TenderList from './TenderList';
import './styles/TenderDashboard.css'


const TenderDashboard = () => {
    const [tenders, setTenders] = useState([{name: 'tender 1', description: '1 ghjgj'}, {name: 'tender 2', description: '2 klfjfj'}]);

    useEffect(() => {
        // Simulate fetching tenders from the database
        // Replace this with your actual API call
        const fetchData = async () => {
        try {
            // Fetch tenders from the database or API
            const response = await fetch('your-api-endpoint');
            const data = await response.json();
            setTenders(data);
        } catch (error) {
            console.error('Error fetching tenders:', error);
        }
        };

        fetchData();
    }, []); // Run only once on component mount

    const handleCreateTender = () => {
        // Handle logic to create a new tender
        console.log('Creating a new tender...');
    };

    return (
        <div className='dashboard-body body-container'>
            <div className="card tdb-card">
                <button onClick={handleCreateTender} className="create-tender-button">
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