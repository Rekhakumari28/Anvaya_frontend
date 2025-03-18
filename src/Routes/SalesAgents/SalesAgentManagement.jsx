import React from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'
import SalesAgentListComponent from './SalesAgentListComponent'

function SalesAgentManagement() {
  return (
    <>
     <LeadHeading/> 
     <div className='row'>
      <div className='col-md-3'>
        <SidebarNav />
      </div>
      <div className='col-md-9 mt-5 pt-5'>
        <SalesAgentListComponent/>
      </div>
     </div>
    </>
  )
}

export default SalesAgentManagement
