import React from 'react'
import { Link } from 'react-router-dom'

export let leadList=[
  {
      "_id":1,
      "name": "Acme Corp1",
      "source": "Referral",
      "salesAgent": {
          "name": "John Doe",
          "email": "john@example.com"
        }
        ,   
      "status": "New",
      "tags": ["High Value", "Follow-up"],
      "timeToClose": 30,
      "priority": "High"
    },
    {
      "_id":2,
      "name": "Acme Corp2",
      "source": "Referral",
      "salesAgent": {

          "name": "Alex Doe",
          "email": "Alex@example.com"
        }
        ,  
      "status": "Contacted",
      "tags": ["High Value", "Follow-up"],
      "timeToClose": 30,
      "priority": "High"
    },
    
    {
      "_id":3,
      "name": "Acme Corp3",
      "source": "Referral",
      "salesAgent": {

          "name": "Alex Doe",
          "email": "Alex@example.com"
        }
        ,  
      "status": "Qualified",
      "tags": ["High Value", "Follow-up"],
      "timeToClose": 30,
      "priority": "High"
    }
    
    
]

function LeadListComponent() {
 
  return (
    <div className='border rounded p-4 m-2'>
      <h3 className="text-center">Lead Overview</h3>
      <hr />      
        {leadList.map(lead=><div   key={lead._id}>
            [{lead.name}] - [{lead.status}] - [{lead.salesAgent.name}]
           
        </div>)}        
      
    </div>
  )
}

export default LeadListComponent
