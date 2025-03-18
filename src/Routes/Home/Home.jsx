import React from "react";

import { Link } from "react-router-dom";
import { leadList } from "../Leads/LeadListComponent";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import Filters from "../../components/Filters";

function Home() {
  
  const statusNew = leadList.filter((lead) => lead.status === "New").length;
  const statusContacted = leadList.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const statusQualified = leadList.filter(
    (lead) => lead.status === "Qualified"
  ).length;
  return (
    <>
      <LeadHeading />

      <div className="row">
        <div className="col-md-3">
          <SidebarNav />
        </div>
        <div className="col-md-9 mt-5 pt-5">
          <div className="row">
            {leadList.map((lead) => (
              <div className="col-md-4" key={lead._id}>
                <Link to={`/leadDetails/${lead._id}`}>
                <div className="border rounded p-4 m-2">{lead.name}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="border rounded p-4 m-2">
            <h4 className='text-center'>Lead Status:</h4>
            <hr />
            <p> - New: [{statusNew}] Leads</p>
            <p> - Contacted: [{statusContacted}] Leads</p>
            <p> - Qualified: [{statusQualified}] Leads</p>
          </div>
         <Filters/>
       
        </div>
      </div>
    </>
  );
}

export default Home;
