import React, { useState }  from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'

import SalesAgentListComponent from './SalesAgentListComponent'
import AddAgent from './AddAgent'


function SalesAgentManagement() {
  
  return (
    <>
     <LeadHeading/> 
     <div className="row" style={{ marginTop: "52px" }}>
        <div
          style={{ maxWidth: "250px", height: "100%" }}
          className="offcanvas offcanvas-start show "
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileSidebarLabel">
              Dashboard
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {" "}
            </button>
          </div>
          <div className="offcanvas-body">
            <SidebarNav />
          </div>
        </div>
         <div
                  className="col-12 col-md-3 col-lg-2 col-md-2 d-none d-md-block"
                  style={{ position: "fixed" }}
                >
                  <SidebarNav />
                </div>
      <div className="col-12 col-md-3 col-lg-2 col-md-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
     
      <div className="container-fluid px-2 py-2">
        <SalesAgentListComponent/>
        
      </div>
     
      </div>
     </div>
    </>
  )
}

export default SalesAgentManagement
