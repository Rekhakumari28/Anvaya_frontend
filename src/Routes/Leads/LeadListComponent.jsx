import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLeads } from "../../features/leadsSlice";
import Filters from "../../components/Filters";

function LeadListComponent() {
  const dispatch = useDispatch();
  const leadList = useSelector((state) => {
    return state.leads.leads;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  return (
    <div className="border rounded p-4 m-2">
      <h3 className="text-center">Lead Overview</h3>
      <hr />
      {leadList?.length > 0 &&
        leadList?.map((lead) => (
          <div key={lead._id}>
            {lead.name} - {lead.status} - {lead.salesAgent.name}
          </div>
        ))}
    </div>
  );
}

export default LeadListComponent;
