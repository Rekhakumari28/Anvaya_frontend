import React, { useState } from 'react'


function Filters() {
   
  return (
<>
{location.pathname === "/" ?  <div className="border rounded p-4 m-2">
    <strong>Filters:</strong> <span>[New] </span> <span>[Contacted] </span> <span>[Qualified]</span>
    
       </div> 
  : location.pathname === "/leads" ?    
  <div className="border rounded p-4 m-2">
    <strong>Filters:</strong> <span>[New] </span> <span>[Contacted] </span> <span>[Qualified]</span>
   
    </div> 
    : location.pathname === "/sales" ? 
    <div className="border rounded p-4 m-2">
    <strong>Filters:</strong> <span>[New] </span> <span>[Contacted] </span> <span>[Qualified]</span>
    
    </div> 
    : location.pathname.includes("/leadDetails/") ?
    <div>
    
     
    </div> 
    : <></>
    
    
    
  }
   
    </>
  )
}

export default Filters
