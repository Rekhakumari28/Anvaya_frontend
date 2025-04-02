import React  from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'

import SalesAgentListComponent from './SalesAgentListComponent'
import { Link } from 'react-router-dom';

function SalesAgentManagement() {
 
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
                     <Link to="/addLead" className="button">
                       Add New Lead
                     </Link>
                   </div>
      </div>
     
      </div>
     </div>
    </>
  )
}

export default SalesAgentManagement
