import React from "react";

function LeadHeading({leadData}) {
  return (
    <>
      {location.pathname === "/" || location.pathname === "/report" ? (
        <div className="py-4 text-center border fs-4 bg-light fixed-top">
          Anvaya CRM Dashboard
        </div>
      ) : location.pathname === "/leads" ? (
        <div className="py-4 text-center border fs-4 bg-light fixed-top">
         Lead List 
        </div>
      ) : location.pathname.includes('/leadDetails/') ? (
        <div className="py-4 text-center border fs-4 bg-light fixed-top">
          Lead Management: {leadData?.name}
        </div>
      )
      
      
      : location.pathname === "/sales" ? (
        <div className="py-4 text-center border fs-4 bg-light fixed-top ">
          Sales Agent Management
        </div>
      ) : location.pathname === "/agents" ? (
        <div className="py-4 text-center border fs-4 bg-light fixed-top">
          Add New Sales Agent
        </div>
      )  : (
        <div className="py-4 text-center border fs-4 bg-light fixed-top">
          Leads by Sales Agent
        </div>
      )}
    </>
  );
}

export default LeadHeading;
