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

  return (
    <>
      <TenderList tenders={tenders} />
    </>
  )
}

export default VendorDashboard