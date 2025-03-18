import React, { useState } from 'react'
import LeadForm from './LeadForm'

function Filters() {
    const [isActive, setIsActive] = useState(false)
  return (
    <div className="border rounded p-4 m-2">
    <strong>Filters:</strong> <span>[New] </span> <span>[Contacted] </span> <span>[Qualified]</span>
    <div><button isActive={isActive} onClick={()=>setIsActive(!isActive)}>Add New Lead</button></div>
    {isActive ? <LeadForm /> : "" }
    </div>
  )
}

export default Filters
