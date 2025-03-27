import React from 'react'
import LeadHeading from '../../components/LeadHeading'
import LeadListComponent from './LeadListComponent'
import SidebarNav from '../../components/SidebarNav'
import Filters from '../../components/Filters'

function LeadsList() {
  return (
    <>
      <LeadHeading/>
      <div className='row ' >
        <div className='col-md-3'>
            <SidebarNav/>
        </div>
        <div className='col-md-9 mt-5 pt-5'>
            <LeadListComponent/>
            <Filters />
            <div><Link >Add New Lead</Link></div>
        </div>
        
      </div>
    </>
  )
}

export default LeadsList
