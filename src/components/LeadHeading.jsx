import React from "react";

export const ToggleButton = ()=> {
  return ( <button
        className="btn btn-secondary d-md-none float-end"
        
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
        aria-controls="mobileSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>)
}
function LeadHeading({ leadData, agent }) {
  const myClassName = "fixed-top bg-dark text-light  p-2 mb-2 fw-normal fs-4";
  return (
    <>
      {location.pathname === "/home" ? (
        <div className={myClassName}>Anvaya CRM Dashboard <ToggleButton /> </div>
      ) : location.pathname === "/reports" ? (
        <div className={myClassName}>Anvaya CRM Reports  <ToggleButton /></div>
      ) : location.pathname === "/leads" ? (
        <div className={myClassName}>Lead List  <ToggleButton /></div>
      ) : location.pathname.includes("/leadDetails/") ? (
        <div className={myClassName}>Lead Management: {leadData?.name}  <ToggleButton /></div>
      ) : location.pathname === "/sales" ? (
        <div className={myClassName}>Sales Agent Management  <ToggleButton /></div>
      ) : location.pathname === "/agents" ? (
        <div className={myClassName}>Add New Sales Agent  <ToggleButton /></div>
      ) : location.pathname.includes("/leadsByStatus/") ? (
        <div className={myClassName}>Leads by Status  <ToggleButton /></div>
      ) : location.pathname === "/settings" ? (
        <div className={myClassName}>Anvaya CRM Settings <ToggleButton /></div>
      )  : location.pathname === "/addLead" ? (
        <div className={myClassName}>Add Lead<ToggleButton /></div>
      ): location.pathname.includes("/addLead/")  ? (
        <div className={myClassName}>Update Lead<ToggleButton /></div>
      ): (
        <div className={myClassName}>Leads by Sales Agent <ToggleButton /></div>
      )}
    </>
  );
}

export default LeadHeading;
