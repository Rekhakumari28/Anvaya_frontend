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
  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const agentName = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const leadsSortedByTimeToClose = useSelector((state) => {
    return state.filters
  });
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

  const handleSortByTimeToClose = () => {
   
  };

  const mappingData =
    filters.length > 0
      ? filters.filter((lead) => lead.salesAgent?.name === agentName.agentName)
      : leadsSortedByPriority?.concatSortedData?.length > 0
      ? leadsSortedByPriority?.concatSortedData.filter(
          (lead) => lead.salesAgent?.name === agentName.agentName
        )
      : filterByCloseTime
      ? filterByCloseTime?.filter(
          (lead) => lead.salesAgent?.name === agentName.agentName
        )
      : leads.filter((lead) => lead.salesAgent?.name === agentName.agentName);

  const leadsData = leads.filter(
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
            <div className="py-2">
              <div className="row">
               
                <div className="row " style={{ margin: "0 6px" }}>
                  <span className="col-md-2 ">
                     <h2 className="mt-2">Filters </h2>
                  </span>

                  <span className="col-md-2 mt-2">
                    <select
                      className="form-select"
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    >
                      <option>Select Status</option>
                      {leadsRemoveDuplicates.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </span>

                  <span className="col-md-2  mt-2">
                    <select
                      className="form-select "
                      onChange={(event) =>
                        dispatch(sortedLeadByPriority(event.target.value))
                      }
                    >
                      <option>Select Priority</option>
                      <option value="Low-High">Low-High</option>
                      <option value="High-Low">High-Low</option>
                    </select>
                  </span>
                  <span className="col-md-2 mt-3 ">
                    <label>
                      {" "}
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={handleSortByTimeToClose}
                      />{" "}
                      Time to Close
                    </label>
                  </span>
                  <span className="col-md-2 mt-2">
                    <button className="btn btn-secondary">Reset</button>
                  </span>
                </div>
              </div>
              <hr />
            </div>

            <div className="row">
              {mappingData?.length > 0 ? (
                mappingData?.map((lead) => (
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
              ) : leadsData?.length > 0 ? (
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
