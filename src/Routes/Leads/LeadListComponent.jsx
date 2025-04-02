import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../features/leadsSlice";

function LeadListComponent({
  filters,
  filteredLeadsBySalesAgent,
  sortedByPriority,
  filterByCloseTime,
}) {
  const dispatch = useDispatch();
  const leadList = useSelector((state) => {
    return state.leads.leads;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  const filterLeadsMapping =
    filters?.length > 0
      ? filters
      : filteredLeadsBySalesAgent?.length > 0
      ? filteredLeadsBySalesAgent
      : sortedByPriority?.length > 0
      ? sortedByPriority
      : filterByCloseTime?.length > 0
      ? filterByCloseTime
      : leadList;

  return (
    <div className="sections">
      <h3 className="content-heading">
        {filters?.length > 0
          ? "Leads with Status"
          : filteredLeadsBySalesAgent?.length > 0
          ? "Leads by Sales Agent"
          : "All Leads"}
      </h3>
      <div className="hr-gray ">
        {" "}
        <hr />
      </div>

      <div className="rows">
        {filterLeadsMapping &&
          filterLeadsMapping.length > 0 &&
          filterLeadsMapping?.map((lead) => (
            <div key={lead._id} className="cols col-mds">
              <div className="cards">
                <div className="cards-body">
                  <h4 className="marginLead">{lead.name}</h4>
                  <p className="marginLead">
                    Sales Agent: {lead.salesAgent.name}
                  </p>
                  <p className="marginLead">Status: {lead.status}</p>
                  <p className="marginLead">Priority: {lead.priority}</p>
                  <p className="marginLead">Time to Close: {lead.timeToClose}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LeadListComponent;
