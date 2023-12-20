import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TenderList from './TenderList';
import './styles/TenderDashboard.css'
import FloatingNavbar from './FloatingNavbar';


const TenderDashboard = () => {
    const [tenders, setTenders] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
      const ta_id = '1'; 
      fetch(`http://localhost:5000/fetch-tenders?taId=${ta_id}`)
        .then(response => response.json())
        .then(data => setTenders(data));
    }, []);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const apiUrl = `https://docudeck.pythonanywhere.com/fetch-tenders`;
        
    //             const response = await fetch(apiUrl, {
    //               method: 'GET',
    //               headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': '*', 
    //               },
    //             });
        
    //             if (response.ok) {
    //               const data = await response.json();
    //               setTenders(data);
    //               console.log('recieved list')
    //             } else {
    //               console.error('Error fetching tenders:', response.statusText);
    //             }
    //           } catch (error) {
    //             console.error('Error fetching tenders:', error);
    //           }
        
    //     };

    //     fetchData();
    // }, []); // Run only once on component mount

    return (
        <div className='dashboard-body body-container'>
            <FloatingNavbar />
            <div className="card tdb-card">
                <button onClick={() => navigate('/tia-upload-tender')} className="create-tender-button">
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