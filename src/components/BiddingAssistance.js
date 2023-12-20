import React from 'react'
import Chatbot from './Chatbot'
import { useState } from 'react'

const BiddingAssistance = () => {

    const [tno, setTno] = useState('')
  return (
    <div>
        <input
              type="date"
              value={tno}
              onChange={(e) => setTno(e.target.value)}
        />
        <Chatbot />
    </div>
  )
}

export default BiddingAssistance