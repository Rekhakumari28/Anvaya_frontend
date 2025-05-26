import React, { useEffect, useState } from "react";

import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupedLead } from "../../features/leadsSlice";
import { sortedLeadByTimeToClose } from "../../features/filterSlice";
import MobileSidebar from "../../components/MobileSidebar";

function LeadsByStatus() {
  const [filtersAgent, setFiltersAgent] = useState("");
  const [sortingLead, setSortingLead] = useState([]);
  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const status = useParams();
  const dispatch = useDispatch();

  const statusGrouped = useSelector((state) => {
    return state.leads.statusGrouped.leadsByStatus;
  });

  const leadsSortedByPriority = useSelector((state) => {
    return state.filters.prioritySortedLead;
  });

  const leadsSortedByTimeToClose = useSelector((state) => {
    return state.filters.timeToCloseSortedLead;
  });

  useEffect(() => {
    dispatch(getGroupedLead());
    dispatch(sortedLeadByTimeToClose());
  }, []);

  const findGroup = Object.entries(statusGrouped)
    .filter(([keys, values]) => keys === status?.status)
    .map((lead) => lead[1]);

  const leadsRemoveDuplicatesAgentName = [...findGroup[0]].reduce(
    (acc, curr) =>
      acc.includes(curr.salesAgent?.name)
        ? acc
        : [...acc, curr.salesAgent?.name],
    []
  );

  const filteredLeadsBySalesAgent = findGroup[0]?.filter(
    (lead) => lead.salesAgent?.name === filtersAgent
  );

  const handleSortByTimeToClose = () => {
    setFilterByCloseTime(leadsSortedByTimeToClose?.sortByTimeToClose);
  };

  const mappingLeads =
    filteredLeadsBySalesAgent?.length > 0
      ? filteredLeadsBySalesAgent.filter(
          (lead) => lead.status === status.status
        )
      : leadsSortedByPriority?.concatSortedData?.length > 0
      ? leadsSortedByPriority?.concatSortedData.filter(
          (lead) => lead.status === status.status
        )
      : filterByCloseTime
      ? filterByCloseTime.filter((lead) => lead.status === status.status)
      : findGroup[0];

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
            <div className="py-2">
              <div className="row ">
                <span className="col-md-2 ">
                  <h2 className="mt-2">Filters:</h2>{" "}
                </span>

                <span className="col-md-2 mt-3 ">
                  <select
                    className="form-select "
                    onChange={(event) => setFiltersAgent(event.target.value)}
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
                    className="form-select mb-3 mt-3"
                    onChange={(event) =>
                      dispatch(sortedLeadByPriority(event.target.value))
                    }
                  >
                    <option>Select Priority</option>
                    <option value="Low-High">Low-High</option>
                    <option value="High-Low">High-Low</option>
                  </select>
                </span>
                <span className="col-md-2 mt-4">
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
                <span className="col-md-2 mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </span>
              </div>
            </div>
            <div className="py-2">
              <div>
                {mappingLeads?.length > 0
                  ? mappingLeads?.map((lead) => (
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
