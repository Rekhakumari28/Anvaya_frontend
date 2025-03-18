import React from 'react'
import LeadHeading from '../../components/LeadHeading'
import SidebarNav from '../../components/SidebarNav'
import { useParams } from 'react-router-dom'
import { leadList } from '../Leads/LeadListComponent'

export const commentList = [
  { 
    _id:1,
    "commentText": "1 Reached out to lead, waiting for response."
  },
  { 
    _id:2,
    "commentText": "2 Reached out to lead, waiting for response."
  },
  { 
    _id:3,
    "commentText": "3 Reached out to lead, waiting for response."
  },
]

function LeadDetailsManagement() {
  const leadId = useParams()
  const leadData = leadList?.find(lead=> lead._id == leadId.leadId)

  return (
    <>
      <LeadHeading  leadData={leadData}/>
      <div className='row ' >
        <div className='col-md-3'>
            <SidebarNav/>
        </div>
        <div className='col-md-9 mt-5 pt-5'>
        <div className="border rounded p-4 m-2">
            <h4 className='text-center'>Lead Details:</h4>
            <hr />
            <p> Lead Name: [{leadData?.name}]</p>
            <p> Sales Agent: [{leadData?.salesAgent.name}]</p>
            <p> Lead Source: [{leadData?.source}]</p>
            <p> Lead Status: [{leadData?.status}]</p>
            <p> Priority: [{leadData?.priority}]</p>
            <p> Time to Close: [{leadData?.timeToClose}]</p> 
          </div>
          <div className="border rounded p-4 m-2"><button>Edit Lead Details</button></div>
          <div className="border rounded p-4 m-2">
            <h4 className='text-center'>Comments Sections</h4>
            <hr />
            {commentList.map(comment=> <div key={comment._id}>
              <p>[leadData?.name] - [data/time]</p>
              <p>Comment: [Reached out - waiting]</p>
            </div> )}           
            <hr />
            <input type="text" placeholder='Add new comment' className='form-control'/>
            <button>Submit</button>
          </div>
         
        </div>
        
      </div>
    </>
  )
}

export default LeadDetailsManagement
