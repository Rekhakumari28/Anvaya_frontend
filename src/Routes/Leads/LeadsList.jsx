import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import LeadListComponent from "./LeadListComponent";
import SidebarNav from "../../components/SidebarNav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadsByQuery,
  sortedLeadByPriority,
  sortedLeadByTimeToClose,
} from "../../features/filterSlice";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { fetchLeads } from "../../features/leadsSlice";

function LeadsList() {
  const [filtersAgent, setFiltersAgent] = useState("");

  const [filterByCloseTime, setFilterByCloseTime] = useState([]);
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => {
    return state.filters;
  });

  const leadsSortedByPriority = useSelector((state) => {
    return state.filters.prioritySortedLead;
  });

  
  const leadsSortedByTimeToClose = useSelector((state) => {
    return state.filters.timeToCloseSortedLead;
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
    dispatch(fetchLeads()); 
    dispatch(sortedLeadByTimeToClose())
   
  }, []);

  const filteredLeadsBySalesAgent = leads.filter((lead) => {
    return lead.salesAgent?.name === filtersAgent;
  });

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };
  
  const handleSortByTimeToClose = () => {
  
   setFilterByCloseTime(leadsSortedByTimeToClose?.sortByTimeToClose)
  };

  return (
    <>
      <LeadHeading />
      <div className="mainContent ">
        <div className="rows">
          <div>
            <SidebarNav />
          </div>
          <div className="cols" style={{ width: "100%" }}>
            <LeadListComponent
              filters={filters}
              filteredLeadsBySalesAgent={filteredLeadsBySalesAgent}
              sortedByPriority={leadsSortedByPriority?.concatSortedData}
              filterByCloseTime={filterByCloseTime}
            />
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
                    {leadsRemoveDuplicates &&
                      leadsRemoveDuplicates?.map((agent, index) => (
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
                    onChange={(event)=>dispatch(sortedLeadByPriority(event.target.value))}
                  >
                    <option>Select Priority</option>
                    <option value="Low-High">Low-High</option>
                    <option value="High-Low">High-Low</option>
                  </select>
                </span>
                <span
                  className="cols "
                  style={{ width: "250px", margin: "6px" }}
                >
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
            <div className="sections">
              <Link className="button" to="/addLead">Add New Lead</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsList;
