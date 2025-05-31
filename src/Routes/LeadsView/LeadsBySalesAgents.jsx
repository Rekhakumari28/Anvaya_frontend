import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import {
  fetchLeadsByQuery,
 
} from "../../features/filterSlice";
import MobileSidebar from "../../components/MobileSidebar";

function LeadsBySalesAgents() {
  const agentName = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
 
  const { filters } = useSelector((state) => {
    return state.filters;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  });

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  }; 

  const leadsData = filters.length > 0 ? filters.filter(
    (lead) => lead.salesAgent?.name === agentName.agentName
  ) : leads.filter(
    (lead) => lead.salesAgent?.name === agentName.agentName
  );
  const leadsRemoveDuplicates = leadsData.reduce(
    (acc, curr) => (acc.includes(curr.status) ? acc : [...acc, curr.status]),
    []
  );


  return (
    <>
      <LeadHeading  />
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
          <div className="container-fluid px-2">
            <div className="row">
              <div className="mt-4"><h2>Sales Agent: {agentName.agentName}</h2></div>
            </div>
            <hr />
            <div className="py-2">
              <div className="row">
               
                <div className="row " >
                  <span className="col-auto ">
                     <h4 className="mt-2">Filters </h4>
                  </span>

                  <span className="col-auto">
                    <select
                      className="form-select"
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      {leadsRemoveDuplicates.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </span>

                  <span className="col-auto ">
                     <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("prioritySort", event.target.value)
                    }
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  </span>
                  <span className="col-auto ">
                    <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("source", event.target.value)
                    }
                  >
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisment">Advertisment</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                    {}
                  </select>
                  </span>
                  <span className="col-auto">
                    <button className="btn btn-secondary">Reset</button>
                  </span>
                </div>
              </div>
             
            </div>

            <div className="row">
             { leadsData?.length > 0 ? (
                leadsData.map((lead) => (
                  <div className="col-md-12 my-2" key={lead._id}>
                    <div className="card bg-success-subtle">
                      <div className="card-body">
                        <strong>{lead?.name}</strong> | Status: {lead.status} |
                        Priority: {lead.priority} | Time to Close:{" "}
                        {lead.timeToClose}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12 my-2">
                  <div className="card bg-success-subtle">
                    <div className="card-body">
                      No Leads for this sales agent.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsBySalesAgents;
