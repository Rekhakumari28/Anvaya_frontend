import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadsByQuery,

} from "../../features/filterSlice";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { fetchLeads } from "../../features/leadsSlice";
import { AddLead } from "../../components/homeComponents/AllLeads";
import MobileSidebar from "../../components/MobileSidebar";

function LeadsList() {
    const dispatch = useDispatch();

  const { filters } = useSelector((state) => {
    return state.filters;
  });

  const { leads } = useSelector((state) => state.leads);

  const leadsRemoveDuplicates = leads.reduce(
    (acc, curr) =>
      acc.includes(curr.salesAgent?.name)
        ? acc
        : [...acc, curr.salesAgent?.name],
    []
  );

  useEffect(() => {
    dispatch(fetchAllSalesAgent());
   
    dispatch(fetchLeads())
   
  }, []);


  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  }; 
  

  return (
    <>
      <LeadHeading />
      <div className="row" style={{ marginTop: "52px" }}>     

        <div
          className="col-12 col-md-3 col-lg-2  d-none d-md-block"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2  d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
           <MobileSidebar />
          <div className="container-fluid px-2 py-2">
            <div className="row">
               <h2 className="mt-2">Filters</h2>
            </div>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  
                  <th className=" bg-success-subtle " scope="table">
                    <select
                      className="form-select"
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    >
                      <option>Select Status</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </th>
                  <th className=" bg-success-subtle" scope="table">
                    {" "}
                    <select
                      className="form-select"
                      onChange={(event) => handleFilterChange("salesAgent", event.target.value)}
                    >
                      <option>Select Agent</option>
                      {leadsRemoveDuplicates &&
                        leadsRemoveDuplicates?.map((agent, index) => (
                          <option key={index} value={agent}>
                            {agent}
                          </option>
                        ))}
                    </select>
                  </th>
                  <th className=" bg-success-subtle" scope="table">
                    {" "}
                    <select
                      className="form-select "
                      onChange={(event) =>
                        handleFilterChange("priority",event.target.value)
                      }
                    >
                      <option>Select Priority</option>
                      <option value="Low-High">Low-High</option>
                      <option value="High-Low">High-Low</option>
                    </select>
                  </th>
                
                  <th className="bg-success-subtle" scope="table">
                     <select
                      className="form-select "
                      onChange={(event) =>
                        handleFilterChange("source",event.target.value)
                      }
                    >
                      <option>Select Source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Advertisment">Advertisment</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                      {}
                    </select>
                  </th>
                    <th className="bg-success-subtle" scope="table">
                    <label className="">
                      {" "}
                      <input
                        type="checkbox"
                        className="form-check-input mb-2"
                        onChange={()=>handleFilterChange("timeToClose", "minToHigh" )}
                      />{" "}
                      Time to Close
                    </label>
                  </th>
                  <th className=" bg-success-subtle" scope="table rounded-end">
                    <button className="btn btn-secondary" onClick={()=>window.location.reload()}>Reset</button>
                    {" "}
                   <AddLead />
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider border rounded">
                {filters ?
                  filters.length > 0 &&
                  filters?.map((lead) => (
                    <tr key={lead._id}>
                      <th scope="row">
                        <span>{lead.name}</span>
                      </th>
                      <td>
                        {" "}
                        <span>{lead.status}</span>
                      </td>
                      <td>
                        {" "}
                        <span>
                          {lead.salesAgent.name} ({lead.salesAgent.email})
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.source}</span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.priority}</span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.tags.join(", ")}</span>{" "}
                      </td>{" "}
                    </tr>
                  )) : leads?.map((lead) => (
                    <tr key={lead._id}>
                      <th scope="row">
                        <span>{lead.name}</span>
                      </th>
                      <td>
                        {" "}
                        <span>{lead.status}</span>
                      </td>
                      <td>
                        {" "}
                        <span>
                          {lead.salesAgent.name} ({lead.salesAgent.email})
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.source}</span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.priority}</span>
                      </td>
                      <td>
                        {" "}
                        <span>{lead.tags.join(", ")}</span>{" "}
                      </td>{" "}
                    </tr>
                  )) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsList;
