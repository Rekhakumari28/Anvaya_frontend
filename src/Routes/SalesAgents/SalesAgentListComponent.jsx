import React, { useEffect, useState } from 'react'
import AddAgent from './AddAgent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSalesAgent } from '../../features/salesAgentSlice'

function SalesAgentListComponent() {
  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch()
  const agentList = useSelector((state)=>{
    return state.salesAgent
  })
  
  useEffect(()=>{
dispatch(fetchAllSalesAgent())
  },[])

  return (
    <div className='border rounded p-4 m-2'>
         <h3>Sales Agent List</h3>
         <hr />      
           {agentList.agents?.length > 0 && agentList?.agents?.map(agent=><div   key={agent._id}>
              Agent: [{agent.name}] - [{agent.email}] 
              
           </div>)}    
           <hr />    
         <button isActive={isActive} onClick={()=>setIsActive(!isActive)}>Add New Agent</button>

         {isActive ?  <AddAgent/> : ""}
       </div>
  )
}

export default SalesAgentListComponent
