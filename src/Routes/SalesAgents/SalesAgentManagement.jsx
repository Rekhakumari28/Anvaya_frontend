import React, { useState }  from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'

import SalesAgentListComponent from './SalesAgentListComponent'
import AddAgent from './AddAgent'


function SalesAgentManagement() {
  const [isActive, setIsActive] = useState(false)
  return (
    <>
     <LeadHeading/> 
     <div className='mainContent'>
      <div className='rows'>
      <div >
        <SidebarNav />
      </div>
      <div className='cols' style={{width:"100%"}}>
        <SalesAgentListComponent/>
        <div
                     className=" sections"
                     style={{ textAlign: "center", paddingTop: "24px" }}
                   >
                    <button className='button border-0'  isActive={isActive} onClick={()=>setIsActive(!isActive)}>Add New Agent</button>
                    {isActive ? <AddAgent /> : "" }
                   </div>
      </div>
     
      </div>
     </div>
    </>
  )
}

export default SalesAgentManagement
