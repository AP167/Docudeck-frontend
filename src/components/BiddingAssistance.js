import React from 'react'
import Chatbot from './Chatbot'
import { useState } from 'react'
import './styles/BiddingAssistance.css'

const BiddingAssistance = () => {

    const [tno, setTno] = useState('')
  return (
    <>
        <div className="card bid-card">
          <h1>Bidding Assistance</h1>
        </div>
        <Chatbot />
    </>
  )
}

export default BiddingAssistance