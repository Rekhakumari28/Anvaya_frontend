import React, { useEffect, useState } from "react";

import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, getGroupedLead } from "../../features/leadsSlice";
import { fetchTagsAsync } from "../../features/tagSlice";
import MobileSidebar from "../../components/MobileSidebar";
import { fetchLeadsByQuery } from "../../features/filterSlice";

function LeadsByStatus() {
  const [filtersAgent, setFiltersAgent] = useState("");
  const [sortingLead, setSortingLead] = useState([]);
  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const status = useParams();
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tags);

  const statusGrouped = useSelector(
    (state) => state.leads.statusGrouped.leadsByStatus
  );

  const filters = useSelector((state)=>{
    console.log(state.filters, "filters")
    return state.filters
  })

  useEffect(() => {
    dispatch(getGroupedLead());
    dispatch(fetchLeads());
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  const findGroup = Object.entries(statusGrouped)
    .filter(([keys, values]) => keys === status?.status)
    .map((lead) => lead[1]);
  console.log(findGroup);

  const leadsRemoveDuplicatesAgentName = [...findGroup[0]].reduce(
    (acc, curr) =>
      acc.includes(curr.salesAgent?.name)
        ? acc
        : [...acc, curr.salesAgent?.name],
    []
  );

  const handleFilterChange = (key, value) => {   
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };

  

  return (
    <>
      <LeadHeading status={status?.status} />
      <div className="row" style={{ marginTop: "52px" }}>
        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
          <MobileSidebar />
          <div className="container-fluid px-2">
            <div className="row">
              <h2 className="mt-2">Filters</h2>
            </div>
            <hr />
            <div className="py-2">
              <div className="row">
                <span className="col-md-2  ">
                  <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("salesAgent", event.target.value)
                    }
                  >
                    <option>Select Agent</option>
                    {leadsRemoveDuplicatesAgentName?.map((agent, index) => (
                      <option key={index} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                </span>

                <span className="col-md-2  ">
                  <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("priority", event.target.value)
                    }
                  >
                    <option>Select Priority</option>
                    <option value="Low-High">Low-High</option>
                    <option value="High-Low">High-Low</option>
                  </select>
                </span>
                <span className="col-md-2">
                  <select
                    className="form-select "
                    onClick={(e) => handleFilterChange("tag", e.target.value)}
                  >
                    <option value="">Select Tag</option>
                    {Array.isArray(tags) &&
                      tags?.map((tag) => (
                        <option value={tag.name} key={tag._id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                  </span>
                     <span className="col-md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(event) =>
                        handleFilterChange("timeToClose", "minToHigh")
                      }
                    />{" "}
                    Time to Close
                  </label>
                </span>
                
              </div>
            </div>
            <div className="py-2">
              <div>
                {filters?.length > 0
                  ? filters?.map((lead) => (
                      <div
                        className="card bg-success-subtle border-0 mt-2"
                        key={lead._id}
                      >
                        <div className="card-body p-3">
                          <strong>{lead?.name}</strong> | Sales Agent:{" "}
                          {lead.salesAgent?.name} | Priority: {lead.priority} |
                          Time to Close: {lead.timeToClose}
                        </div>
                      </div>
                    ))
                  : findGroup[0]?.map((lead) => (
                      <div
                        className="card bg-success-subtle border-0 mt-2"
                        key={lead._id}
                      >
                        <div className="cards-body p-3">
                          <strong>{lead?.name}</strong> | Sales Agent:{" "}
                          {lead.salesAgent?.name} | Priority: {lead.priority} |
                          Time to Close: {lead.timeToClose}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsByStatus;
