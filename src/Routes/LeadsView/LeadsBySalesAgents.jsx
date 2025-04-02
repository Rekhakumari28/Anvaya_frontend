import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { fetchLeadsByQuery, sortedLeadByTimeToClose } from "../../features/filterSlice";

function LeadsBySalesAgents() {
  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const agentName = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const leadsSortedByTimeToClose = useSelector((state) => {
    return state.filters.timeToCloseSortedLead;
  });
  const { filters } = useSelector((state) => {
      return state.filters;
    });

  useEffect(() => {
    dispatch(fetchLeads());
  
  });

  const findLeadsData = leads.filter(
    (lead) => lead.salesAgent?.name === agentName.agentName
  );
  const leadsRemoveDuplicates = findLeadsData.reduce(
    (acc, curr) => (acc.includes(curr.status) ? acc : [...acc, curr.status]),
    []
  );

 const handleFilterChange = (key, value) => {
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };

  const handleSortByTimeToClose = () => {
    dispatch(sortedLeadByTimeToClose());
    setFilterByCloseTime(leadsSortedByTimeToClose?.sortByTimeToClose);
  };

  const mappingData = filterByCloseTime.length > 0
    ? filterByCloseTime?.filter(
        (lead) => lead.salesAgent?.name === agentName.agentName
      )
    : filters.length> 0 ? filters.filter((lead) => lead.salesAgent?.name === agentName.agentName)
      : leads.filter((lead) => lead.salesAgent?.name === agentName.agentName);
console.log(mappingData)
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
              <h3 className="content-heading">Lead List by Agent</h3>
              <div className="hr-gray ">
                {" "}
                <hr />
              </div>
              <div className="rows">
                <div
                  className="cards"
                  style={{
                    width: "80%",
                    marginLeft: "100px",
                    fontSize: "18px",
                  }}
                >
                  <div className="cards-body">
                    Sales Agent: | {agentName.agentName}
                  </div>
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
                {mappingData?.length > 0 ? (
                  mappingData?.map((lead) => (
                    <div
                      className="cards"
                      key={lead._id}
                      style={{ margin: "12px 6px 0 0", width: "100%" }}
                    >
                      <div className="cards-body">
                        <strong>{lead?.name}</strong> | Status: {lead.status} |
                        Priority: {lead.priority} | Time to Close:{" "}
                        {lead.timeToClose}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="cards"
                    style={{ margin: "12px 6px 0 0", width: "100%" }}
                  >
                    <div className="cards-body">
                      No Leads for this sales agent.
                    </div>
                  </div>
                )}
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
                    className="form-select"
                    onChange={ (event)=> handleFilterChange("status", event.target.value)}
                  
                  >
                    <option>Select Status</option>
                    {leadsRemoveDuplicates.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
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
                    onChange={(event) =>
                      dispatch(sortedLeadByPriority(event.target.value))
                    }
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
                      type="checkbox"
                      className="form-check-input"
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

export default LeadsBySalesAgents;
