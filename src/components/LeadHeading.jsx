import React from "react";
import "./../App.css";
function LeadHeading({ leadData }) {
  return (
    <>
      {location.pathname === "/" ? (
        <div className="leadHeading ">Anvaya CRM Dashboard</div>
      ) : location.pathname === "/reports" ? (
        <div className="leadHeading ">Anvaya CRM Reports</div>
      ) : location.pathname === "/leads" ? (
        <div className="leadHeading">Lead List</div>
      ) : location.pathname.includes("/leadDetails/") ? (
        <div className="leadHeading">Lead Management: {leadData?.name}</div>
      ) : location.pathname === "/sales" ? (
        <div className="leadHeading ">Sales Agent Management</div>
      ) : location.pathname === "/agents" ? (
        <div className="leadHeading">Add New Sales Agent</div>
      ) : location.pathname.includes("/leadsByStatus/") ? (
        <div className="leadHeading">Leads by Status</div>
      ) : location.pathname === "/settings" ? (
        <div className="leadHeading">Anvaya CRM Settings</div>
      ) : (
        <div className="leadHeading">Leads by Sales Agent</div>
      )}
    </>
  );
}

export default LeadHeading;
