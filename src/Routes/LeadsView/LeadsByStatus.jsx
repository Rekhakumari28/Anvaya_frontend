import React, { useEffect, useState } from "react";

import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupedLead } from "../../features/leadsSlice";

function LeadsByStatus() {
  const [filtersAgent, setFiltersAgent] = useState("");
  const [sortingLead, setSortingLead] = useState([]);
  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const status = useParams();
  const dispatch = useDispatch();

  const statusGrouped = useSelector((state) => {
    return state.leads.statusGrouped.leadsByStatus;
  }); 

  useEffect(() => {
    dispatch(getGroupedLead());
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

  const handleSortByPriority = (event) => {
    let filtered = findGroup[0];
    // const valueSelected = event.target.value;
    // const prefix = valueSelected === "Low-High" ? "Low" : "High";

    // filtered = [...filtered]?.sort((firstItem, secondItem) => {
    //   const aStartsWithPrefix = firstItem.priority.startsWith(prefix);
    //   const bStartsWithPrefix = secondItem.priority.startsWith(prefix);
    //   console.log(aStartsWithPrefix, "first");
    //   console.log(bStartsWithPrefix, "second");
    //   if (aStartsWithPrefix && !bStartsWithPrefix) {
    //     return -1;
    //   }
    //   if (!aStartsWithPrefix && bStartsWithPrefix) {
    //     return 1;
    //   }
    //   return firstItem.priority.localeCompare(secondItem.priority);
    // }
    // );

    filtered = [...filtered]?.sort((first, second) =>
      first.priority > second.priority
        ? 1
        : second.priority - first.priority
        ? -1
        : 0
    );
    setSortingLead(filtered);
    setSortingLead(filtered);
  };

  const handleSortByTimeToClose = () => {
    let filtered = findGroup[0];
    const sortedByTimeToClose = [...filtered].sort((a, b) => {
      a.timeToClose - b.timeToClose;
    });
    setFilterByCloseTime(sortedByTimeToClose);
  };

  const mappingLeads =
    filteredLeadsBySalesAgent?.length > 0
      ? filteredLeadsBySalesAgent
      : sortingLead?.length > 0
      ? sortingLead
      : filterByCloseTime?.length > 0
      ? sortingLead
      : findGroup[0];

  return (
    <>
      <LeadHeading />
      <div className="mainContent">
        <div className="rows">
          <div>
            <SidebarNav />
          </div>
          <div className="cols" style={{ width: "100%" }}>
            <div className="sections">
              <h4 className="content-heading">Lead List by Status:</h4>
              <div className="hr-gray">
                <hr />
              </div>
              <div className="rows">
                <div
                  className="cards "
                  style={{
                    width: "80%",
                    marginLeft: "100px",
                    fontSize: "18px",
                  }}
                >
                  <div className="cards-body">Status | {status?.status}</div>
                </div>
                <div className="hr-gray">
                  <hr />
                </div>
              </div>
            </div>
            <div className="sections">
              <h4 className="content-heading">Leads:</h4>
              <div className="hr-gray">
                <hr />
              </div>
              <div
                className="rows"
                style={{
                  width: "80%",
                  margin: "12px 0  0 100px",
                  fontSize: "18px",
                }}
              >
                {mappingLeads?.map((lead) => (
                  <div
                    className="cards"
                    key={lead._id}
                    style={{ margin: "12px 6px 0 0", width: "100%" }}
                  >
                    <div className="cards-body">
                      <strong>{lead?.name}</strong> | Sales Agent:{" "}
                      {lead.salesAgent?.name} | Priority: {lead.priority} | Time
                      to Close: {lead.timeToClose}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sections">
              <div className="rows " style={{ margin: "0 6px" }}>
                <span
                  className="cols "
                  style={{ width: "250px", margin: "6px" }}
                >
                  <h5 className="text-center">Filters:</h5>{" "}
                </span>

                <span
                  className="cols "
                  style={{ width: "250px", margin: "6px" }}
                >
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
              </div>
              <div className="rows" style={{ margin: "0 6px" }}>
                <span
                  className="cols "
                  style={{ width: "250px", margin: "6px" }}
                >
                  {" "}
                  <h5 className="text-center">Sort by:</h5>{" "}
                </span>

                <span
                  className="cols  "
                  style={{ width: "250px", margin: "6px" }}
                >
                  <select
                    className="form-select mb-3"
                    onChange={handleSortByPriority}
                  >
                    <option>Select Priority</option>
                    <option value="High-Low">High-Low</option>
                    <option value="Low-High">Low-High</option>
                  </select>
                </span>
                <span className="cols ">
                  <label>
                    {" "}
                    <input
                      type="radio"
                      onChange={handleSortByTimeToClose}
                    />{" "}
                    Time to Close
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsByStatus;
