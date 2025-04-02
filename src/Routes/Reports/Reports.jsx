import React from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'
import ReportComponent from './ReportComponent'

function Reports() {
  return (
    <>
      <LeadHeading/>
      <div className='mainContent'>
      <div className='rows'>
        <div >
          <SidebarNav/>
        </div>
        <div className='cols' style={{width:"100%"}}>
          <ReportComponent />
        </div>
        </div>
      </div>
    </>
  )
}

export default Reports
