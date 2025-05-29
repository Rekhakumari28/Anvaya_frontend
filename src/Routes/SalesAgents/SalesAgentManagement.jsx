import React, { useState }  from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'

import SalesAgentListComponent from './SalesAgentListComponent'
import AddAgent from './AddAgent'
import MobileSidebar from '../../components/MobileSidebar'


function SalesAgentManagement() {
  
  return (
    <>
     <LeadHeading/> 
     <div className="row" style={{ marginTop: "52px" }}>
       
         <div
                  className="col-12 col-md-3 col-lg-2 col-md-2 d-none d-md-block"
                  style={{ position: "fixed" }}
                >
                  <SidebarNav />
                </div>
      <div className="col-12 col-md-3 col-lg-2 col-md-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
       <MobileSidebar />
      <div className="container-fluid px-2 py-2">
        <SalesAgentListComponent/>
        
      </div>
     
      </div>
     </div>
    </>
  )
}

export default SalesAgentManagement
