import React from 'react'

function ReportComponent() {
  return (
    <div className='border rounded p-4 m-2'> 
      <h4>Report Overview</h4>
      <hr />
      <p>Total Leads closed and in Pipeline: [Pie Chart]</p>
      <hr />
      <p>Leads Closed by Sales Agent: [Bar Chart]</p>
      <hr />
      <p>Lead Status Distribution: [Pie Chart or Bar Chart]</p>
    </div>
  )
}

export default ReportComponent
