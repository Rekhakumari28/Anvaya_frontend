import React, { useState } from 'react'
import AddAgent from './AddAgent'

export const agentList =[
  {
    _id: 1,
    "name": "John1 Doe",
    "email": "john1@example.com"
  },
  {
    _id: 2,
    "name": "John2 Doe",
    "email": "john2@example.com"
  },
  {
    _id: 3,
    "name": "John3 Doe",
    "email": "john3@example.com"
  },
]

function SalesAgentListComponent() {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className='border rounded p-4 m-2'>
         <h3>Sales Agent List</h3>
         <hr />      
           {agentList.map(agent=><div   key={agent._id}>
              Agent: [{agent.name}] - [{agent.email}] 
              
           </div>)}    
           <hr />    
         <button isActive={isActive} onClick={()=>setIsActive(!isActive)}>Add New Agent</button>

         {isActive ?  <AddAgent/> : ""}
       </div>
  )
}

export default SalesAgentListComponent
